import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import cloudinary, { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";

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

    let finalTemplateUrl = `/templates/certificate-template.png?v=${Date.now()}`;
    let cloudinaryPublicId = "";

    // 1. Upload / Replace in Cloudinary if configured
    if (isCloudinaryConfigured) {
      try {
        const uploadRes = await uploadToCloudinary(buffer, {
          folder: "cybercell/templates",
          public_id: "certificate-template",
          overwrite: true,
          resource_type: "image",
        });
        finalTemplateUrl = uploadRes.secure_url;
        cloudinaryPublicId = uploadRes.public_id;
      } catch (cloudErr) {
        console.warn("[Cloudinary Upload Warning]: Could not upload to Cloudinary, falling back to local storage:", cloudErr);
      }
    }

    // 2. Always persist local copy in public/templates/ as well
    const templatesDir = path.join(process.cwd(), "public", "templates");
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir, { recursive: true });
    }
    const targetPath = path.join(templatesDir, "certificate-template.png");
    fs.writeFileSync(targetPath, buffer);

    // Update config with fresh URL
    const configPath = path.join(process.cwd(), "data", "certificateConfig.json");
    let config: Record<string, unknown> = {};
    if (fs.existsSync(configPath)) {
      try {
        config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      } catch (e) {
        console.warn("Could not parse config:", e);
      }
    }

    config.templateUrl = finalTemplateUrl;
    config.templateFileName = file.name;
    if (cloudinaryPublicId) {
      config.cloudinaryPublicId = cloudinaryPublicId;
    }
    config.updatedAt = new Date().toISOString();

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: isCloudinaryConfigured
        ? "Canva template uploaded to Cloudinary CDN and saved to local server."
        : "Canva template saved to local server (public/templates/certificate-template.png).",
      templateUrl: config.templateUrl,
      sizeBytes: buffer.length,
      fileName: file.name,
      cloudinary: isCloudinaryConfigured,
    });
  } catch (error) {
    console.error("[Template Upload Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const configPath = path.join(process.cwd(), "data", "certificateConfig.json");
    let config: Record<string, unknown> = {};
    if (fs.existsSync(configPath)) {
      try {
        config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      } catch (e) {
        console.warn("Could not parse config:", e);
      }
    }

    const publicId = (config.cloudinaryPublicId as string) || "cybercell/templates/certificate-template";

    // 1. Delete from Cloudinary if configured
    if (isCloudinaryConfigured && publicId) {
      try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      } catch (cloudErr) {
        console.warn("[Cloudinary Delete Warning]:", cloudErr);
      }
    }

    // 2. Delete local template file if exists
    const localTemplatePath = path.join(process.cwd(), "public", "templates", "certificate-template.png");
    if (fs.existsSync(localTemplatePath)) {
      try {
        fs.unlinkSync(localTemplatePath);
      } catch (localErr) {
        console.warn("[Local File Delete Warning]:", localErr);
      }
    }

    // 3. Clear template from config
    config.templateUrl = "";
    config.templateFileName = "";
    config.cloudinaryPublicId = "";
    config.updatedAt = new Date().toISOString();

    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Template successfully deleted from Cloudinary storage and local server.",
    });
  } catch (error) {
    console.error("[Template Delete Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to delete template" },
      { status: 500 }
    );
  }
}
