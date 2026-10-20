import { NextRequest, NextResponse } from "next/server";
import { getCloudinaryCredentials, generateUploadSignature, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const creds = getCloudinaryCredentials();

    if (!creds.cloudName || !creds.apiKey || !creds.apiSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary is not configured. Please add CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment variables.",
        },
        { status: 503 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const folder = (body.folder as string) || "cybercell/templates";
    const timestamp = Math.round(new Date().getTime() / 1000);

    const paramsToSign: Record<string, string | number> = {
      folder,
      timestamp,
    };

    if (body.public_id) {
      paramsToSign.public_id = body.public_id;
    }
    if (body.overwrite !== undefined) {
      paramsToSign.overwrite = body.overwrite ? "true" : "false";
    }

    const signature = generateUploadSignature(paramsToSign);

    return NextResponse.json({
      success: true,
      signature,
      timestamp,
      apiKey: creds.apiKey,
      cloudName: creds.cloudName,
      folder,
    });
  } catch (error) {
    console.error("[Cloudinary Signature Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to generate upload signature" },
      { status: 500 }
    );
  }
}
