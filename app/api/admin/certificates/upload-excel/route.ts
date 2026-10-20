import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";

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

    // Validate that it can be parsed as a spreadsheet
    let rowCount = 0;
    try {
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const firstSheet = workbook.SheetNames[0];
      if (firstSheet) {
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
        rowCount = rows.length;
      }
    } catch {
      return NextResponse.json(
        { success: false, error: "File corrupted or invalid spreadsheet structure." },
        { status: 400 }
      );
    }

    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save as data/attendees.xlsx
    const targetPath = path.join(dataDir, "attendees.xlsx");
    fs.writeFileSync(targetPath, buffer);

    return NextResponse.json({
      success: true,
      message: `Excel sheet uploaded and saved permanently (${rowCount} attendees parsed)!`,
      rowCount,
      fileName: file.name,
    });
  } catch (error) {
    console.error("[Excel Upload Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
