import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import * as XLSX from "xlsx";
import { CertificateRecord, batchSaveCertificateRecords } from "@/lib/certificates";
import { getTemplateById, getActiveTemplate, saveTemplateProfile } from "@/lib/certificateConfig";

const MAX_EXCEL_BYTES = 10 * 1024 * 1024; // 10 MB max
const ALLOWED_EXTENSIONS = [".xlsx", ".xls", ".csv"];

/**
 * Extracts a column value from a row using case-insensitive candidate keys
 */
function getRowValue(row: Record<string, unknown>, candidateKeys: string[]): string {
  const rowKeys = Object.keys(row);
  for (const candidate of candidateKeys) {
    const cleanCandidate = candidate.toLowerCase().replace(/[^a-z0-9]/g, "");
    const foundKey = rowKeys.find(
      (k) => k.toLowerCase().replace(/[^a-z0-9]/g, "") === cleanCandidate
    );
    if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) {
      const val = String(row[foundKey]).trim();
      if (val) return val;
    }
  }
  return "";
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

    // Parse spreadsheet rows
    let rawRows: Record<string, unknown>[] = [];
    try {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const firstSheet = workbook.SheetNames[0];
      if (firstSheet) {
        rawRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
      }
    } catch {
      return NextResponse.json(
        { success: false, error: "Failed to parse spreadsheet. File may be corrupted or password-protected." },
        { status: 400 }
      );
    }

    if (rawRows.length === 0) {
      return NextResponse.json(
        { success: false, error: "The uploaded spreadsheet contains no rows." },
        { status: 400 }
      );
    }

    // Convert rows into official CertificateRecords with flexible column matching
    const records: CertificateRecord[] = [];
    rawRows.forEach((row, idx) => {
      const name = getRowValue(row, [
        "name",
        "recipient name",
        "student name",
        "full name",
        "participant name",
        "candidate name",
        "first name",
        "student",
        "name of student",
        "name of candidate",
      ]);

      const scholarNo = getRowValue(row, [
        "scholar number",
        "scholar no",
        "scholar no.",
        "scholarno",
        "enrollment number",
        "enrollment no",
        "enrollment no.",
        "enrollment",
        "roll no",
        "roll no.",
        "roll number",
        "rollno",
        "id",
        "registration no",
        "reg no",
      ]);

      // Skip row only if both Name and Scholar No are missing
      if (!name && !scholarNo) return;

      const certId = (
        getRowValue(row, ["certificate id", "cert id", "certificate no", "cert no", "id"]) ||
        `CYB-2026-${scholarNo || idx + 1}`
      ).trim().toUpperCase();

      const eventName =
        reqEventName ||
        templateProfile?.eventName ||
        getRowValue(row, ["event", "event name", "workshop", "competition"]) ||
        "National Cyber Defense Wargame 2026";

      const role =
        getRowValue(row, ["role", "role or rank", "rank", "position", "category"]) ||
        "Participant";

      const issueDate =
        templateProfile?.issueDate ||
        getRowValue(row, ["issue date", "date", "issuance date"]) ||
        new Date().toISOString().split("T")[0];

      records.push({
        id: `excel-${idx}`,
        certificate_id: certId,
        scholar_number: scholarNo,
        recipient_name: name || `Student ${idx + 1}`,
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
    });

    if (records.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Could not detect student names or scholar numbers. Please ensure your Excel sheet has columns for 'Name' and 'Scholar Number'.",
        },
        { status: 400 }
      );
    }

    // 1. Read existing attendees and merge so previous events' attendees are preserved!
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

    // Merge: update existing by certificate_id or append new
    const attendeeMap = new Map<string, CertificateRecord>();
    allAttendees.forEach((a) => attendeeMap.set(a.certificate_id, a));
    records.forEach((r) => attendeeMap.set(r.certificate_id, r));
    const mergedAttendees = Array.from(attendeeMap.values());

    // 2. Save merged list to /tmp/attendees.json and template-specific cache
    try {
      fs.writeFileSync(attendeesTmpPath, JSON.stringify(mergedAttendees, null, 2), "utf-8");
      fs.writeFileSync(path.join(os.tmpdir(), "attendees.xlsx"), buffer);

      if (templateProfile?.id) {
        fs.writeFileSync(
          path.join(os.tmpdir(), `attendees_${templateProfile.id}.json`),
          JSON.stringify(records, null, 2),
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

    // 4. Update the template profile's attendeesCount
    if (templateProfile) {
      try {
        await saveTemplateProfile({
          id: templateProfile.id,
          attendeesCount: records.length,
        });
      } catch (err) {
        console.warn("[Update Template attendeesCount Warning]:", err);
      }
    }

    // 5. Save records to Firestore (with safe timeout so serverless never hangs)
    try {
      await withTimeout(batchSaveCertificateRecords(records), 2500);
    } catch (saveErr) {
      console.warn("[Excel Firestore Save Warning - persisted locally]:", (saveErr as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed and loaded ${records.length} attendees for "${templateProfile?.name || 'Current Event'}"!`,
      rowCount: records.length,
      templateId: templateProfile?.id,
      fileName: file.name,
      attendees: records.map((r) => ({
        name: r.recipient_name,
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
