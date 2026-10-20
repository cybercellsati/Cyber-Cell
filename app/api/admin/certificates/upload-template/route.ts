import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import cloudinary, { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";
import { getStoredConfig, saveStoredConfig } from "@/lib/certificateConfig";

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

    // 1. Primary: Upload to Cloudinary CDN
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
        console.error("[Cloudinary Upload Error]:", cloudErr);
        return NextResponse.json(
          { success: false, error: "Cloudinary upload failed: " + (cloudErr as Error).message },
          { status: 500 }
        );
      }
    }

    // 2. Secondary: Local disk cache (safe try/catch so read-only Vercel serverless /var/task never fails)
    try {
      const templatesDir = path.join(process.cwd(), "public", "templates");
      if (!fs.existsSync(templatesDir)) {
        fs.mkdirSync(templatesDir, { recursive: true });
      }
      fs.writeFileSync(path.join(templatesDir, "certificate-template.png"), buffer);
    } catch {
      // In production serverless (Vercel), /var/task is read-only.
      // Cloudinary serves as the global CDN for the template.
    }

    // 3. Save configuration persistently (Firestore + /tmp)
    const updatedConfig = await saveStoredConfig({
      templateUrl: finalTemplateUrl,
      templateFileName: file.name,
      cloudinaryPublicId: cloudinaryPublicId || "cybercell/templates/certificate-template",
    });

    return NextResponse.json({
      success: true,
      message: isCloudinaryConfigured
        ? "Canva template uploaded to Cloudinary CDN and saved successfully!"
        : "Canva template saved successfully.",
      templateUrl: updatedConfig.templateUrl,
      fileName: file.name,
      sizeBytes: buffer.length,
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
    const config = await getStoredConfig();
    const publicId = config.cloudinaryPublicId || "cybercell/templates/certificate-template";

    // 1. Delete from Cloudinary if configured
    if (isCloudinaryConfigured && publicId) {
      try {
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      } catch (cloudErr) {
        console.warn("[Cloudinary Delete Warning]:", cloudErr);
      }
    }

    // 2. Safe local file cleanup
    try {
      const localTemplatePath = path.join(process.cwd(), "public", "templates", "certificate-template.png");
      if (fs.existsSync(localTemplatePath)) {
        fs.unlinkSync(localTemplatePath);
      }
    } catch {}

    // 3. Reset config
    await saveStoredConfig({
      templateUrl: "",
      templateFileName: "",
      cloudinaryPublicId: "",
    });

    return NextResponse.json({
      success: true,
      message: "Template successfully deleted from Cloudinary storage.",
    });
  } catch (error) {
    console.error("[Template Delete Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to delete template" },
      { status: 500 }
    );
  }
}
