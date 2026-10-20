import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import * as XLSX from "xlsx";
import { CertificateRecord, batchSaveCertificateRecords } from "@/lib/certificates";

const MAX_EXCEL_BYTES = 5 * 1024 * 1024; // 5 MB max
const ALLOWED_EXTENSIONS = [".xlsx", ".xls", ".csv"];

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
        { success: false, error: "File exceeds 5 MB size limit." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse spreadsheet rows
    let parsedRows: any[] = [];
    try {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const firstSheet = workbook.SheetNames[0];
      if (firstSheet) {
        parsedRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
      }
    } catch {
      return NextResponse.json(
        { success: false, error: "File corrupted or invalid spreadsheet structure." },
        { status: 400 }
      );
    }

    // Convert rows into official CertificateRecords
    const records: CertificateRecord[] = [];
    parsedRows.forEach((row, idx) => {
      const scholarNo = String(
        row["Scholar Number"] || row["Scholar No"] || row["scholar_number"] || row["Enrollment No"] || ""
      ).trim();
      const name = String(
        row["Name"] || row["Recipient Name"] || row["Student Name"] || row["recipient_name"] || ""
      ).trim();

      if (!name && !scholarNo) return;

      const certId = String(
        row["Certificate ID"] || row["certificate_id"] || row["Cert ID"] || `CYB-2026-${scholarNo || idx + 1}`
      ).trim().toUpperCase();

      records.push({
        id: `excel-${idx}`,
        certificate_id: certId,
        scholar_number: scholarNo,
        recipient_name: name,
        event_name: String(row["Event"] || row["Event Name"] || row["event_name"] || "National Cyber Defense Wargame 2026"),
        issue_date: String(row["Issue Date"] || row["issue_date"] || new Date().toISOString().split("T")[0]),
        expiry_date: "2030-01-01",
        image_url: "",
        is_download_active: true,
        role_or_rank: String(row["Role"] || row["role_or_rank"] || "Participant"),
        issued_by: "Cyber Cell, SATI Vidisha",
        created_at: new Date().toISOString(),
      });
    });

    // Save records to Firestore
    if (records.length > 0) {
      try {
        await batchSaveCertificateRecords(records);
      } catch (saveErr) {
        console.warn("[Excel Firestore Save Warning]:", saveErr);
      }
    }

    // Safe disk write to /tmp
    try {
      fs.writeFileSync(path.join(os.tmpdir(), "attendees.xlsx"), buffer);
    } catch {}

    // Safe disk write to data/attendees.xlsx (local dev only)
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(path.join(dataDir, "attendees.xlsx"), buffer);
    } catch {}

    return NextResponse.json({
      success: true,
      message: `Excel sheet processed successfully (${records.length} attendees loaded)!`,
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
