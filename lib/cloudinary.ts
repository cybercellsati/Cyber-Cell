import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export function getCloudinaryCredentials() {
  let cloudName = process.env.CLOUDINARY_CLOUD_NAME || "";
  let apiKey = process.env.CLOUDINARY_API_KEY || "";
  let apiSecret = process.env.CLOUDINARY_API_SECRET || "";

  if (process.env.CLOUDINARY_URL && (!cloudName || !apiKey || !apiSecret)) {
    try {
      // Format: cloudinary://<api_key>:<api_secret>@<cloud_name>
      const parsed = new URL(process.env.CLOUDINARY_URL);
      apiKey = parsed.username || apiKey;
      apiSecret = parsed.password || apiSecret;
      cloudName = parsed.hostname || cloudName;
    } catch (e) {
      console.warn("Could not parse CLOUDINARY_URL:", e);
    }
  }

  return { cloudName, apiKey, apiSecret };
}

// Initialize Cloudinary
const creds = getCloudinaryCredentials();
if (creds.cloudName && creds.apiKey && creds.apiSecret) {
  cloudinary.config({
    cloud_name: creds.cloudName,
    api_key: creds.apiKey,
    api_secret: creds.apiSecret,
    secure: true,
  });
} else if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
  });
}

export const isCloudinaryConfigured = Boolean(
  creds.cloudName && creds.apiKey && creds.apiSecret
);

export interface CloudinaryUploadOptions {
  folder?: string;
  public_id?: string;
  overwrite?: boolean;
  resource_type?: "image" | "raw" | "auto";
}

/**
 * Generates an upload signature for direct client-to-Cloudinary uploads
 */
export function generateUploadSignature(paramsToSign: Record<string, string | number>) {
  const { apiSecret } = getCloudinaryCredentials();
  if (!apiSecret) {
    throw new Error("Cloudinary API Secret is not configured.");
  }
  return cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
}

/**
 * Uploads a base64 data URI or Buffer to Cloudinary (Server-side)
 */
export async function uploadToCloudinary(
  fileContent: string | Buffer,
  options: CloudinaryUploadOptions = {}
): Promise<{ url: string; secure_url: string; public_id: string }> {
  if (!isCloudinaryConfigured) {
    throw new Error(
      "Cloudinary is not configured. Please set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  const {
    folder = "cybercell",
    public_id,
    overwrite = true,
    resource_type = "auto",
  } = options;

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder,
      public_id,
      overwrite,
      resource_type,
    };

    if (Buffer.isBuffer(fileContent)) {
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(error || new Error("Cloudinary upload failed"));
          }
          resolve({
            url: result.url,
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      );
      uploadStream.end(fileContent);
    } else {
      // Base64 string or image URL
      cloudinary.uploader.upload(fileContent, uploadOptions, (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }
        resolve({
          url: result.url,
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      });
    }
  });
}

export default cloudinary;
