import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

const DEFAULT_CLOUD_NAME = "qtfezfsf";
const DEFAULT_API_KEY = "355444168593654";
const DEFAULT_API_SECRET = "f9-TaSWWwFyXzcN7V2sisYT5fms";

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

  // Resilient fallback to project credentials if missing in Vercel environment variables
  if (!cloudName) cloudName = DEFAULT_CLOUD_NAME;
  if (!apiKey) apiKey = DEFAULT_API_KEY;
  if (!apiSecret) apiSecret = DEFAULT_API_SECRET;

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

export default cloudinary;

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
      cloudinary.uploader.upload(
        fileContent,
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
    }
  });
}

/**
 * Persists a JSON object or array to Cloudinary raw storage (Cross-serverless permanent cloud sync)
 */
export async function saveJsonToCloudinary(
  publicId: string,
  data: unknown
): Promise<string> {
  const { cloudName } = getCloudinaryCredentials();
  const jsonStr = typeof data === "string" ? data : JSON.stringify(data, null, 2);
  const dataUri = "data:application/json;base64," + Buffer.from(jsonStr).toString("base64");

  const res = await cloudinary.uploader.upload(dataUri, {
    resource_type: "raw",
    folder: "cybercell/data",
    public_id: publicId,
    overwrite: true,
  });

  return res.secure_url || `https://res.cloudinary.com/${cloudName}/raw/upload/cybercell/data/${publicId}`;
}

/**
 * Fetches a JSON file from Cloudinary CDN by publicId (Fast, global CDN with zero GCP dependencies)
 */
export async function fetchJsonFromCloudinary<T>(
  publicId: string
): Promise<T | null> {
  const { cloudName } = getCloudinaryCredentials();
  if (!cloudName) return null;

  try {
    const url = `https://res.cloudinary.com/${cloudName}/raw/upload/cybercell/data/${publicId}?t=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[Cloudinary Fetch JSON Warning for ${publicId}]:`, (err as Error).message);
    return null;
  }
}
