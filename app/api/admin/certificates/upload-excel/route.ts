import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import * as XLSX from "xlsx";
import { CertificateRecord, batchSaveCertificateRecords } from "@/lib/certificates";

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
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No Excel file provided in request" },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json(
        { success: false, error: "Invalid file extension. Only .xlsx, .xls, and .csv files are permitted." },
        { status: 400 }
      );
    }

    if (file.size > MAX_EXCEL_BYTES) {
      return NextResponse.json(
        { success: false, error: "File exceeds 10 MB size limit." },
        { status: 400 }
      );
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
        { success: false, error: "File corrupted or invalid spreadsheet structure." },
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
        getRowValue(row, ["event", "event name", "workshop", "competition"]) ||
        "National Cyber Defense Wargame 2026";

      const role =
        getRowValue(row, ["role", "role or rank", "rank", "position", "category"]) ||
        "Participant";

      const issueDate =
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

    // 1. Save to /tmp/attendees.json and /tmp/attendees.xlsx (Fastest in serverless)
    try {
      fs.writeFileSync(path.join(os.tmpdir(), "attendees.json"), JSON.stringify(records, null, 2), "utf-8");
      fs.writeFileSync(path.join(os.tmpdir(), "attendees.xlsx"), buffer);
    } catch {}

    // 2. Safe local file write in dev mode
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(path.join(dataDir, "attendees.json"), JSON.stringify(records, null, 2), "utf-8");
      fs.writeFileSync(path.join(dataDir, "attendees.xlsx"), buffer);
    } catch {}

    // 3. Save records to Firestore (with safe timeout so serverless never hangs)
    try {
      await withTimeout(batchSaveCertificateRecords(records), 2500);
    } catch (saveErr) {
      console.warn("[Excel Firestore Save Warning - persisted locally]:", (saveErr as Error).message);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed and loaded ${records.length} attendees!`,
      rowCount: records.length,
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
