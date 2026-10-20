import fs from "fs";
import path from "path";
import os from "os";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface CertificateConfigSettings {
  templateUrl: string;
  templateFileName?: string;
  cloudinaryPublicId?: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  color: string;
  yPositionPercent: number;
  xPositionPercent: number;
  textTransform: "uppercase" | "capitalize" | "none";
  eventName?: string;
  issueDate?: string;
  updatedAt?: string;
}

export const defaultCertificateConfig: CertificateConfigSettings = {
  templateUrl: "",
  templateFileName: "",
  cloudinaryPublicId: "",
  fontFamily: "'Cinzel', serif",
  fontSize: 76,
  fontWeight: "bold",
  color: "#d4af37",
  yPositionPercent: 49.5,
  xPositionPercent: 50.0,
  textTransform: "uppercase",
  eventName: "National Cyber Defense Wargame 2026",
  issueDate: new Date().toISOString().split("T")[0],
};

const tmpConfigPath = path.join(os.tmpdir(), "certificateConfig.json");
const localConfigPath = path.join(process.cwd(), "data", "certificateConfig.json");

/**
 * Retrieves the current certificate configuration
 * Checks Firestore first, then /tmp, then bundled local file
 */
export async function getStoredConfig(): Promise<CertificateConfigSettings> {
  // 1. Check Cloud Firestore (Persistent across Vercel serverless functions)
  if (isFirebaseConfigured) {
    try {
      const docSnap = await getDoc(doc(db, "system_settings", "certificate_config"));
      if (docSnap.exists()) {
        const data = docSnap.data() as Partial<CertificateConfigSettings>;
        return {
          ...defaultCertificateConfig,
          ...data,
        };
      }
    } catch (e) {
      console.warn("[Firestore Config Read Warning]:", e);
    }
  }

  // 2. Check /tmp (Writable in Vercel Serverless)
  try {
    if (fs.existsSync(tmpConfigPath)) {
      const parsed = JSON.parse(fs.readFileSync(tmpConfigPath, "utf-8"));
      return { ...defaultCertificateConfig, ...parsed };
    }
  } catch {}

  // 3. Check bundled local file
  try {
    if (fs.existsSync(localConfigPath)) {
      const parsed = JSON.parse(fs.readFileSync(localConfigPath, "utf-8"));
      return { ...defaultCertificateConfig, ...parsed };
    }
  } catch {}

  return defaultCertificateConfig;
}

/**
 * Saves certificate configuration
 * Persists to Firestore, /tmp, and safely attempts local disk write
 */
export async function saveStoredConfig(
  newConfig: Partial<CertificateConfigSettings>
): Promise<CertificateConfigSettings> {
  const current = await getStoredConfig();
  const merged: CertificateConfigSettings = {
    ...current,
    ...newConfig,
    updatedAt: new Date().toISOString(),
  };

  // 1. Save to Cloud Firestore
  if (isFirebaseConfigured) {
    try {
      await setDoc(doc(db, "system_settings", "certificate_config"), merged, { merge: true });
    } catch (e) {
      console.warn("[Firestore Config Write Warning]:", e);
    }
  }

  // 2. Save to /tmp
  try {
    fs.writeFileSync(tmpConfigPath, JSON.stringify(merged, null, 2), "utf-8");
  } catch {}

  // 3. Attempt local disk save (fails silently on read-only serverless filesystems like Vercel)
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(localConfigPath, JSON.stringify(merged, null, 2), "utf-8");
  } catch {}

  return merged;
}
