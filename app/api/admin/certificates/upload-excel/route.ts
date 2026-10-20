import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import * as XLSX from "xlsx";
import { CertificateRecord, batchSaveCertificateRecords, formatStudentName } from "@/lib/certificates";
import { getTemplateById, getActiveTemplate, saveTemplateProfile } from "@/lib/certificateConfig";
import { saveJsonToCloudinary, fetchJsonFromCloudinary } from "@/lib/cloudinary";

const MAX_EXCEL_BYTES = 10 * 1024 * 1024; // 10 MB max
const ALLOWED_EXTENSIONS = [".xlsx", ".xls", ".csv"];

/**
 * Checks if a column header represents the recipient / student name
 */
function isNameHeader(h: unknown): boolean {
  if (!h) return false;
  const clean = String(h).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!clean) return false;

  // Filter out negative keywords like college name, father's name, event name, team name, email
  if (
    clean.includes("college") ||
    clean.includes("school") ||
    clean.includes("university") ||
    clean.includes("father") ||
    clean.includes("mother") ||
    clean.includes("parent") ||
    clean.includes("event") ||
    clean.includes("workshop") ||
    clean.includes("team") ||
    clean.includes("group") ||
    clean.includes("email") ||
    clean.includes("branch") ||
    clean.includes("timestamp")
  ) {
    return false;
  }

  return (
    clean.includes("name") ||
    clean.includes("student") ||
    clean.includes("participant") ||
    clean.includes("candidate") ||
    clean.includes("attendee") ||
    clean.includes("naam") ||
    clean.includes("chhatra")
  );
}

/**
 * Checks if a column header represents a scholar number, roll number, or enrollment number
 */
function isScholarHeader(h: unknown): boolean {
  if (!h) return false;
  const clean = String(h).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!clean) return false;

  if (clean.includes("certificate") || clean.includes("certid") || clean.includes("photo")) {
    return false;
  }

  return (
    clean.includes("scholar") ||
    clean.includes("enroll") ||
    clean.includes("roll") ||
    clean.includes("rgpv") ||
    clean.includes("regno") ||
    clean.includes("registration") ||
    clean.includes("scholarno") ||
    clean.includes("rollno") ||
    clean.includes("enrollmentno") ||
    clean.includes("urn") ||
    clean.includes("prn") ||
    clean.includes("sid") ||
    clean.includes("uid") ||
    clean === "id"
  );
}

/**
 * Checks if a cell value looks like a scholar number or roll number
 */
function isScholarValue(val: unknown): boolean {
  if (val === undefined || val === null) return false;
  const s = String(val).trim();
  if (!s || s.length < 3 || s.length > 25) return false;

  // SATI format (0108...) or alphanumeric university enrollment
  if (/^0108[A-Za-z0-9]+/i.test(s)) return true;
  // Standard alphanumeric student roll numbers (e.g. 221045, CS221045, RGPV/22/...)
  if (/^[A-Za-z0-9\/\-_]{5,20}$/.test(s) && /\d/.test(s)) return true;
  // Pure digits if typical roll length (4-12 digits)
  if (/^\d{4,12}$/.test(s)) return true;

  return false;
}

/**
 * Checks if a cell value looks like a person's full name
 */
function isNameValue(val: unknown): boolean {
  if (val === undefined || val === null) return false;
  const s = String(val).trim();
  if (!s || s.length < 3 || s.length > 50) return false;

  // Cannot be an email, URL, timestamp, or pure digits
  if (s.includes("@") || s.includes("http") || /^\d+$/.test(s) || isScholarValue(s)) {
    return false;
  }

  // Typical name: letters, dots, spaces (e.g., "Aayush Pandey", "Yash Harfode")
  if (/^[A-Za-z\s.\-']{3,50}$/.test(s) && s.includes(" ")) {
    return true;
  }

  return false;
}

/**
 * Content-based heuristic column detection when headers are ambiguous or missing
 */
function detectColumnsByContent(grid: unknown[][], startRow: number) {
  let maxCols = 0;
  for (let r = startRow; r < Math.min(grid.length, startRow + 20); r++) {
    if (Array.isArray(grid[r])) maxCols = Math.max(maxCols, grid[r].length);
  }

  const scholarScores = new Array(maxCols).fill(0);
  const nameScores = new Array(maxCols).fill(0);

  for (let r = startRow; r < Math.min(grid.length, startRow + 25); r++) {
    const row = grid[r];
    if (!Array.isArray(row)) continue;
    for (let c = 0; c < maxCols; c++) {
      if (isScholarValue(row[c])) scholarScores[c]++;
      if (isNameValue(row[c])) nameScores[c]++;
    }
  }

  const maxScholar = Math.max(...scholarScores, 0);
  const maxName = Math.max(...nameScores, 0);

  const scholarIdx = maxScholar > 0 ? scholarScores.indexOf(maxScholar) : -1;
  const nameIdx = maxName > 0 ? nameScores.indexOf(maxName) : -1;

  return { nameIdx, scholarIdx };
}

/**
 * Executes a promise with an aggressive timeout so Firestore never hangs the response
 */
function withTimeout<T>(promise: Promise<T>, ms = 2500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("excel") as File | null;
    const reqTemplateId = (formData.get("templateId") as string) || "";
    const reqEventName = (formData.get("eventName") as string) || "";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No Excel file provided in request." },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload a .xlsx, .xls, or .csv file." },
        { status: 400 }
      );
    }

    if (file.size > MAX_EXCEL_BYTES) {
      return NextResponse.json(
        { success: false, error: "File exceeds 10 MB size limit." },
        { status: 400 }
      );
    }

    // Load active or targeted template profile for metadata tagging
    let templateProfile = reqTemplateId ? await getTemplateById(reqTemplateId) : null;
    if (!templateProfile) {
      templateProfile = await getActiveTemplate();
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Read workbook
    let workbook: XLSX.WorkBook;
    try {
      workbook = XLSX.read(buffer, { type: "buffer" });
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to parse spreadsheet. File may be corrupted or password-protected." },
        { status: 400 }
      );
    }

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return NextResponse.json(
        { success: false, error: "The uploaded workbook contains no worksheets." },
        { status: 400 }
      );
    }

    // Multi-Sheet & Smart Header Discovery
    let parsedRecords: CertificateRecord[] = [];
    let detectedHeaders: string[] = [];
    let processedSheetName = "";

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) continue;

      const rawGrid: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        blankrows: false,
        defval: "",
      });

      if (!rawGrid || rawGrid.length === 0) continue;

      // 1. Scan rows to find the actual table header row (inspect first 15 rows)
      let headerRowIndex = -1;
      let nameColIdx = -1;
      let scholarColIdx = -1;

      for (let r = 0; r < Math.min(rawGrid.length, 15); r++) {
        const row = rawGrid[r];
        if (!Array.isArray(row)) continue;

        const nIdx = row.findIndex(isNameHeader);
        const sIdx = row.findIndex(isScholarHeader);

        if (nIdx !== -1 || sIdx !== -1) {
          headerRowIndex = r;
          nameColIdx = nIdx;
          scholarColIdx = sIdx;
          detectedHeaders = row.map((cell) => String(cell || "").trim()).filter(Boolean);
          break;
        }
      }

      // 2. If header row was not found by title scanning, fallback to content analysis
      if (headerRowIndex === -1 || (nameColIdx === -1 && scholarColIdx === -1)) {
        headerRowIndex = 0;
        const contentDetection = detectColumnsByContent(rawGrid, 0);
        nameColIdx = contentDetection.nameIdx;
        scholarColIdx = contentDetection.scholarIdx;
      } else if (nameColIdx === -1 || scholarColIdx === -1) {
        // One was found, try content analysis for the missing one
        const contentDetection = detectColumnsByContent(rawGrid, headerRowIndex + 1);
        if (nameColIdx === -1) nameColIdx = contentDetection.nameIdx;
        if (scholarColIdx === -1) scholarColIdx = contentDetection.scholarIdx;
      }

      // If at least Name OR Scholar number column was detected, extract student rows!
      if (nameColIdx !== -1 || scholarColIdx !== -1) {
        processedSheetName = sheetName;
        const startRow = headerRowIndex + 1;

        // Optional auxiliary columns
        const headerRow = (Array.isArray(rawGrid[headerRowIndex]) ? rawGrid[headerRowIndex] : []) as unknown[];
        const eventColIdx = headerRow.findIndex((h) => {
          const s = String(h || "").toLowerCase().replace(/[^a-z0-9]/g, "");
          return s.includes("event") || s.includes("workshop") || s.includes("competition");
        });
        const roleColIdx = headerRow.findIndex((h) => {
          const s = String(h || "").toLowerCase().replace(/[^a-z0-9]/g, "");
          return s.includes("role") || s.includes("rank") || s.includes("position") || s.includes("category");
        });
        const dateColIdx = headerRow.findIndex((h) => {
          const s = String(h || "").toLowerCase().replace(/[^a-z0-9]/g, "");
          return s.includes("date") || s.includes("issue");
        });
        const certIdColIdx = headerRow.findIndex((h) => {
          const s = String(h || "").toLowerCase().replace(/[^a-z0-9]/g, "");
          return s.includes("certid") || s.includes("certificateid") || s.includes("certno");
        });

        for (let r = startRow; r < rawGrid.length; r++) {
          const row = rawGrid[r];
          if (!Array.isArray(row)) continue;

          let rawName = nameColIdx >= 0 && row[nameColIdx] !== undefined ? String(row[nameColIdx]).trim() : "";
          let rawScholar = scholarColIdx >= 0 && row[scholarColIdx] !== undefined ? String(row[scholarColIdx]).trim() : "";

          // Skip completely empty rows
          if (!rawName && !rawScholar) continue;

          // If rawName looks like a scholar number and rawScholar is empty, swap them
          if (!rawScholar && isScholarValue(rawName)) {
            rawScholar = rawName;
            rawName = "";
          }

          // Generate student fallback if only scholar number is available
          if (!rawName && rawScholar) {
            rawName = `Student ${rawScholar}`;
          }

          // Generate scholar fallback if only name is available
          if (!rawScholar && rawName) {
            rawScholar = `STU-${String(parsedRecords.length + 1).padStart(4, "0")}`;
          }

          const certId =
            certIdColIdx >= 0 && row[certIdColIdx]
              ? String(row[certIdColIdx]).trim().toUpperCase()
              : `CYB-2026-${rawScholar.toUpperCase()}`;

          const eventName =
            reqEventName ||
            templateProfile?.eventName ||
            (eventColIdx >= 0 && row[eventColIdx] ? String(row[eventColIdx]).trim() : "") ||
            "National Cyber Defense Wargame 2026";

          const role =
            roleColIdx >= 0 && row[roleColIdx]
              ? String(row[roleColIdx]).trim()
              : "Participant";

          const issueDate =
            templateProfile?.issueDate ||
            (dateColIdx >= 0 && row[dateColIdx] ? String(row[dateColIdx]).trim() : "") ||
            new Date().toISOString().split("T")[0];

          parsedRecords.push({
            id: `excel-${sheetName}-${parsedRecords.length}`,
            certificate_id: certId,
            scholar_number: rawScholar.toUpperCase(),
            recipient_name: formatStudentName(rawName),
            event_name: eventName,
            issue_date: issueDate,
            expiry_date: "2030-01-01",
            image_url: "",
            template_id: templateProfile?.id,
            template_url: templateProfile?.templateUrl || "",
            template_font_family: templateProfile?.fontFamily,
            template_font_size: templateProfile?.fontSize,
            template_font_weight: templateProfile?.fontWeight,
            template_color: templateProfile?.color,
            template_y_pos: templateProfile?.yPositionPercent,
            template_text_transform: templateProfile?.textTransform,
            is_download_active: true,
            role_or_rank: role,
            issued_by: "Cyber Cell, SATI Vidisha",
            created_at: new Date().toISOString(),
          });
        }

        // If records were found in this sheet, stop scanning other sheets
        if (parsedRecords.length > 0) {
          break;
        }
      }
    }

    if (parsedRecords.length === 0) {
      const detectedInfo =
        detectedHeaders.length > 0
          ? `Detected headers: [${detectedHeaders.join(", ")}].`
          : `Sheets checked: [${workbook.SheetNames.join(", ")}].`;

      return NextResponse.json(
        {
          success: false,
          error: `Could not detect student names or scholar numbers in your file. ${detectedInfo} Please ensure at least one column has student names or scholar numbers.`,
        },
        { status: 400 }
      );
    }

    // 1. Read existing attendees and merge so previous events' attendees are preserved
    let allAttendees: CertificateRecord[] = [];
    const attendeesTmpPath = path.join(os.tmpdir(), "attendees.json");
    try {
      if (fs.existsSync(/*turbopackIgnore: true*/ attendeesTmpPath)) {
        const existing = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ attendeesTmpPath, "utf-8"));
        if (Array.isArray(existing)) {
          allAttendees = existing;
        }
      }
    } catch {}

    // If local tmp is empty on a new serverless lambda, pull previous attendees from Cloudinary
    if (allAttendees.length === 0) {
      try {
        const cloudExisting = await fetchJsonFromCloudinary<CertificateRecord[]>("attendees.json");
        if (Array.isArray(cloudExisting) && cloudExisting.length > 0) {
          allAttendees = cloudExisting;
        }
      } catch {}
    }

    // Merge: update existing by certificate_id or append new
    const attendeeMap = new Map<string, CertificateRecord>();
    allAttendees.forEach((a) => attendeeMap.set(a.certificate_id, a));
    parsedRecords.forEach((r) => attendeeMap.set(r.certificate_id, r));
    const mergedAttendees = Array.from(attendeeMap.values());

    // 2. Save merged list to /tmp/attendees.json and template-specific cache
    try {
      fs.writeFileSync(attendeesTmpPath, JSON.stringify(mergedAttendees, null, 2), "utf-8");
      fs.writeFileSync(path.join(os.tmpdir(), "attendees.xlsx"), buffer);

      if (templateProfile?.id) {
        fs.writeFileSync(
          path.join(os.tmpdir(), `attendees_${templateProfile.id}.json`),
          JSON.stringify(parsedRecords, null, 2),
          "utf-8"
        );
      }
    } catch {}

    // 3. Safe local repo disk write in dev mode
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(/*turbopackIgnore: true*/ dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(path.join(dataDir, "attendees.json"), JSON.stringify(mergedAttendees, null, 2), "utf-8");
      fs.writeFileSync(path.join(dataDir, "attendees.xlsx"), buffer);
    } catch {}

    // 4. Save to Cloudinary for permanent cross-serverless cloud persistence
    try {
      await withTimeout(saveJsonToCloudinary("attendees.json", mergedAttendees), 4000);
      if (templateProfile?.id) {
        saveJsonToCloudinary(`attendees_${templateProfile.id}.json`, parsedRecords).catch(() => {});
      }
    } catch (cloudErr) {
      console.warn("[Upload Excel Cloudinary Save Warning]:", cloudErr);
    }

    // 5. Update the template profile's attendeesCount
    if (templateProfile) {
      try {
        await saveTemplateProfile({
          id: templateProfile.id,
          attendeesCount: parsedRecords.length,
        });
      } catch (err) {
        console.warn("[Update Template attendeesCount Warning]:", err);
      }
    }

    // 6. Save records to Firestore (with safe timeout so serverless never hangs)
    try {
      await withTimeout(batchSaveCertificateRecords(parsedRecords), 2500);
    } catch (saveErr) {
      console.warn("[Excel Firestore Save Warning - persisted locally]:", (saveErr as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed and loaded ${parsedRecords.length} attendees from sheet "${processedSheetName}" for "${templateProfile?.name || 'Current Event'}"!`,
      rowCount: parsedRecords.length,
      templateId: templateProfile?.id,
      sheetName: processedSheetName,
      fileName: file.name,
      attendees: parsedRecords.map((r) => ({
        name: formatStudentName(r.recipient_name),
        scholarNumber: r.scholar_number,
        certificateId: r.certificate_id,
        role: r.role_or_rank || "Participant",
      })),
    });
  } catch (error) {
    console.error("[Excel Upload Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
