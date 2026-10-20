import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const MAX_SIZE_BYTES = 15 * 1024 * 1024; // 15MB max

function isValidImageBuffer(buffer: Buffer): boolean {
  if (buffer.length < 4) return false;
  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return true;
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true;
  // WEBP: starts with RIFF and has WEBP at index 8
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return true;
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("template") as File | null;
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No template file provided in request" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "File size exceeds 15 MB limit" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate true image magic bytes
    if (!isValidImageBuffer(buffer)) {
      return NextResponse.json(
        { success: false, error: "Invalid image format. Only valid PNG, JPEG, and WebP files are permitted." },
        { status: 400 }
      );
    }

    const templatesDir = path.join(process.cwd(), "public", "templates");
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir, { recursive: true });
    }

    // Always save permanently to public/templates/certificate-template.png
    const targetPath = path.join(templatesDir, "certificate-template.png");
    fs.writeFileSync(targetPath, buffer);

    // Update config with fresh cache-busting timestamp
    const configPath = path.join(process.cwd(), "data", "certificateConfig.json");
    let config: Record<string, unknown> = {};
    if (fs.existsSync(configPath)) {
      try {
        config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      } catch (e) {
        console.warn("Could not parse config:", e);
      }
    }

    config.templateUrl = `/templates/certificate-template.png?v=${Date.now()}`;
    config.templateFileName = file.name;
    config.updatedAt = new Date().toISOString();

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Canva template permanently saved to server (public/templates/certificate-template.png)",
      templateUrl: config.templateUrl,
      sizeBytes: buffer.length,
      fileName: file.name,
    });
  } catch (error) {
    console.error("[Template Upload Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
