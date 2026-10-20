import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Initialize Cloudinary
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_URL ||
  (process.env.CLOUDINARY_CLOUD_NAME &&
   process.env.CLOUDINARY_API_KEY &&
   process.env.CLOUDINARY_API_SECRET)
);

export interface CloudinaryUploadOptions {
  folder?: string;
  public_id?: string;
  overwrite?: boolean;
  resource_type?: "image" | "raw" | "auto";
}

/**
 * Uploads a base64 data URI or Buffer to Cloudinary
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
