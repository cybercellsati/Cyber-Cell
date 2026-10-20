import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { isCloudinaryConfigured, uploadToCloudinary } from "@/lib/cloudinary";

const COOKIE_NAME = "cybercell_admin_session";
const MAX_SIZE_BYTES = 12 * 1024 * 1024; // 12MB limit

async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);
    return Boolean(session && session.value === "authenticated_admin_session");
  } catch {
    return false;
  }
}

function getExtension(buffer: Buffer): string {
  // PNG: 89 50 4E 47
  if (buffer.length >= 4 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) return "png";
  // JPEG: FF D8 FF
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return "jpg";
  // WEBP: starts with RIFF and has WEBP at index 8
  if (buffer.length >= 12 && buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP") return "webp";
  // GIF: GIF87a or GIF89a
  if (buffer.length >= 6 && buffer.toString("ascii", 0, 3) === "GIF") return "gif";
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const authorized = await isAdmin();
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = (formData.get("image") || formData.get("file")) as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No image file provided." },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { success: false, error: "Image file exceeds 12MB limit." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = getExtension(buffer);
    if (!ext) {
      return NextResponse.json(
        { success: false, error: "Invalid image format. Allowed formats: PNG, JPG, WebP." },
        { status: 400 }
      );
    }

    // 1. Primary: Cloudinary if configured
    if (isCloudinaryConfigured) {
      try {
        const uploadRes = await uploadToCloudinary(buffer, {
          folder: "cybercell/events",
          resource_type: "image",
        });
        if (uploadRes && uploadRes.secure_url) {
          return NextResponse.json({
            success: true,
            url: uploadRes.secure_url,
            publicId: uploadRes.public_id,
          });
        }
      } catch (cloudErr) {
        console.warn("[Upload Image] Cloudinary failed, falling back to local storage:", cloudErr);
      }
    }

    // 2. Local fallback in public/images/events
    const fileName = `event_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "images", "events");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const localUrl = `/images/events/${fileName}`;
    return NextResponse.json({
      success: true,
      url: localUrl,
    });
  } catch (error) {
    console.error("[Upload Image Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to upload image." },
      { status: 500 }
    );
  }
}
