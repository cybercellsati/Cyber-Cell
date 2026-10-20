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
  activeTemplateId?: string;
}

export interface CertificateTemplateProfile {
  id: string;
  name: string;
  eventName: string;
  issueDate: string;
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
  attendeesCount: number;
  createdAt: string;
  updatedAt?: string;
  isActive?: boolean;
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
  activeTemplateId: "tmpl_default",
};

export const defaultTemplateProfile: CertificateTemplateProfile = {
  id: "tmpl_default",
  name: "National Cyber Defense Wargame 2026",
  eventName: "National Cyber Defense Wargame 2026",
  issueDate: new Date().toISOString().split("T")[0],
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
  attendeesCount: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  isActive: true,
};

const tmpConfigPath = path.join(os.tmpdir(), "certificateConfig.json");
const localConfigPath = path.join(process.cwd(), "data", "certificateConfig.json");

const tmpTemplatesPath = path.join(os.tmpdir(), "certificate_templates.json");
const localTemplatesPath = path.join(process.cwd(), "data", "certificate_templates.json");

/**
 * Executes a promise with an aggressive timeout to prevent serverless function hangs
 */
function withTimeout<T>(promise: Promise<T>, ms = 2000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
    ),
  ]);
}

/**
 * Retrieves all saved event certificate template profiles
 */
export async function getAllTemplates(): Promise<CertificateTemplateProfile[]> {
  // 1. Try Cloud Firestore
  if (isFirebaseConfigured) {
    try {
      const snap = await withTimeout(
        getDoc(doc(db, "system_settings", "certificate_templates")),
        2000
      );
      if (snap.exists()) {
        const data = snap.data();
        if (data && Array.isArray(data.templates) && data.templates.length > 0) {
          return data.templates as CertificateTemplateProfile[];
        }
      }
    } catch (e) {
      console.warn("[Firestore Templates Read Warning]:", (e as Error).message);
    }
  }

  // 2. Try /tmp
  try {
    if (fs.existsSync(/*turbopackIgnore: true*/ tmpTemplatesPath)) {
      const parsed = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ tmpTemplatesPath, "utf-8"));
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}

  // 3. Try local repo file
  try {
    if (fs.existsSync(/*turbopackIgnore: true*/ localTemplatesPath)) {
      const parsed = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ localTemplatesPath, "utf-8"));
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}

  // 4. Default: build from legacy config if available
  const legacy = await getStoredConfig();
  const initialProfile: CertificateTemplateProfile = {
    ...defaultTemplateProfile,
    templateUrl: legacy.templateUrl || "",
    templateFileName: legacy.templateFileName || "",
    cloudinaryPublicId: legacy.cloudinaryPublicId || "",
    fontFamily: legacy.fontFamily || defaultTemplateProfile.fontFamily,
    fontSize: legacy.fontSize || defaultTemplateProfile.fontSize,
    color: legacy.color || defaultTemplateProfile.color,
    yPositionPercent: legacy.yPositionPercent || defaultTemplateProfile.yPositionPercent,
    textTransform: legacy.textTransform || defaultTemplateProfile.textTransform,
    eventName: legacy.eventName || defaultTemplateProfile.eventName,
    name: legacy.eventName || defaultTemplateProfile.name,
    isActive: true,
  };

  return [initialProfile];
}

/**
 * Saves the entire list of templates to Firestore, /tmp, and disk
 */
async function persistTemplatesList(templates: CertificateTemplateProfile[]): Promise<void> {
  // Ensure at least one is active
  if (!templates.some((t) => t.isActive) && templates.length > 0) {
    templates[0].isActive = true;
  }

  // 1. Firestore
  if (isFirebaseConfigured) {
    try {
      await withTimeout(
        setDoc(
          doc(db, "system_settings", "certificate_templates"),
          { templates, updatedAt: new Date().toISOString() },
          { merge: true }
        ),
        2500
      );
    } catch (e) {
      console.warn("[Firestore Templates Save Warning]:", (e as Error).message);
    }
  }

  // 2. /tmp
  try {
    fs.writeFileSync(tmpTemplatesPath, JSON.stringify(templates, null, 2), "utf-8");
  } catch {}

  // 3. local repo file
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(/*turbopackIgnore: true*/ dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(localTemplatesPath, JSON.stringify(templates, null, 2), "utf-8");
  } catch {}
}

/**
 * Returns the currently active template profile
 */
export async function getActiveTemplate(): Promise<CertificateTemplateProfile> {
  const all = await getAllTemplates();
  const active = all.find((t) => t.isActive) || all[0] || defaultTemplateProfile;
  return active;
}

/**
 * Retrieves a single template by ID
 */
export async function getTemplateById(id: string): Promise<CertificateTemplateProfile | null> {
  const all = await getAllTemplates();
  return all.find((t) => t.id === id) || null;
}

/**
 * Creates or updates an event certificate template profile
 */
export async function saveTemplateProfile(
  profileData: Partial<CertificateTemplateProfile>
): Promise<CertificateTemplateProfile> {
  const all = await getAllTemplates();
  const id = profileData.id || `tmpl_${Date.now()}`;
  const now = new Date().toISOString();

  const existingIdx = all.findIndex((t) => t.id === id);

  let updatedProfile: CertificateTemplateProfile;

  if (existingIdx >= 0) {
    updatedProfile = {
      ...all[existingIdx],
      ...profileData,
      id,
      updatedAt: now,
    };
    all[existingIdx] = updatedProfile;
  } else {
    updatedProfile = {
      ...defaultTemplateProfile,
      ...profileData,
      id,
      name: profileData.name || `Event Template ${all.length + 1}`,
      eventName: profileData.eventName || profileData.name || "Special Cyber Event",
      issueDate: profileData.issueDate || now.split("T")[0],
      createdAt: now,
      updatedAt: now,
      attendeesCount: profileData.attendeesCount || 0,
      isActive: all.length === 0 ? true : !!profileData.isActive,
    };
    all.push(updatedProfile);
  }

  // If this profile was set as active, mark all others as inactive
  if (updatedProfile.isActive) {
    all.forEach((t) => {
      if (t.id !== id) t.isActive = false;
    });
  }

  await persistTemplatesList(all);

  // Sync to legacy config for backward compatibility
  if (updatedProfile.isActive) {
    await saveStoredConfig({
      templateUrl: updatedProfile.templateUrl,
      templateFileName: updatedProfile.templateFileName,
      cloudinaryPublicId: updatedProfile.cloudinaryPublicId,
      fontFamily: updatedProfile.fontFamily,
      fontSize: updatedProfile.fontSize,
      fontWeight: updatedProfile.fontWeight,
      color: updatedProfile.color,
      yPositionPercent: updatedProfile.yPositionPercent,
      xPositionPercent: updatedProfile.xPositionPercent,
      textTransform: updatedProfile.textTransform,
      eventName: updatedProfile.eventName,
      issueDate: updatedProfile.issueDate,
      activeTemplateId: updatedProfile.id,
    });
  }

  return updatedProfile;
}

/**
 * Sets a specific template as active
 */
export async function setActiveTemplate(id: string): Promise<boolean> {
  const all = await getAllTemplates();
  const target = all.find((t) => t.id === id);
  if (!target) return false;

  all.forEach((t) => {
    t.isActive = t.id === id;
  });

  await persistTemplatesList(all);

  // Also sync to active config
  await saveStoredConfig({
    templateUrl: target.templateUrl,
    templateFileName: target.templateFileName,
    cloudinaryPublicId: target.cloudinaryPublicId,
    fontFamily: target.fontFamily,
    fontSize: target.fontSize,
    fontWeight: target.fontWeight,
    color: target.color,
    yPositionPercent: target.yPositionPercent,
    xPositionPercent: target.xPositionPercent,
    textTransform: target.textTransform,
    eventName: target.eventName,
    issueDate: target.issueDate,
    activeTemplateId: target.id,
  });

  return true;
}

/**
 * Deletes a template profile (cannot delete if it's the only one)
 */
export async function deleteTemplateProfile(id: string): Promise<boolean> {
  let all = await getAllTemplates();
  if (all.length <= 1) return false;

  const targetIdx = all.findIndex((t) => t.id === id);
  if (targetIdx === -1) return false;

  const wasActive = all[targetIdx].isActive;
  all.splice(targetIdx, 1);

  if (wasActive && all.length > 0) {
    all[0].isActive = true;
  }

  await persistTemplatesList(all);

  const newActive = all.find((t) => t.isActive) || all[0];
  if (newActive) {
    await saveStoredConfig({
      templateUrl: newActive.templateUrl,
      templateFileName: newActive.templateFileName,
      cloudinaryPublicId: newActive.cloudinaryPublicId,
      fontFamily: newActive.fontFamily,
      fontSize: newActive.fontSize,
      fontWeight: newActive.fontWeight,
      color: newActive.color,
      yPositionPercent: newActive.yPositionPercent,
      xPositionPercent: newActive.xPositionPercent,
      textTransform: newActive.textTransform,
      eventName: newActive.eventName,
      issueDate: newActive.issueDate,
      activeTemplateId: newActive.id,
    });
  }

  return true;
}

/**
 * Retrieves the current certificate configuration
 * Checks Firestore with timeout, then /tmp, then bundled local file
 */
export async function getStoredConfig(): Promise<CertificateConfigSettings> {
  // 1. Check Cloud Firestore (with 2s timeout)
  if (isFirebaseConfigured) {
    try {
      const docSnap = await withTimeout(
        getDoc(doc(db, "system_settings", "certificate_config")),
        2000
      );
      if (docSnap.exists()) {
        const data = docSnap.data() as Partial<CertificateConfigSettings>;
        return {
          ...defaultCertificateConfig,
          ...data,
        };
      }
    } catch (e) {
      console.warn("[Firestore Config Read Warning - using fast fallback]:", (e as Error).message);
    }
  }

  // 2. Check /tmp (Writable in Vercel Serverless)
  try {
    if (fs.existsSync(/*turbopackIgnore: true*/ tmpConfigPath)) {
      const parsed = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ tmpConfigPath, "utf-8"));
      return { ...defaultCertificateConfig, ...parsed };
    }
  } catch {}

  // 3. Check bundled local file
  try {
    if (fs.existsSync(/*turbopackIgnore: true*/ localConfigPath)) {
      const parsed = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ localConfigPath, "utf-8"));
      return { ...defaultCertificateConfig, ...parsed };
    }
  } catch {}

  return defaultCertificateConfig;
}

/**
 * Saves certificate configuration
 * Persists to Firestore (with timeout), /tmp, and safely attempts local disk write
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

  // 1. Save to Cloud Firestore (with 2.5s timeout)
  if (isFirebaseConfigured) {
    try {
      await withTimeout(
        setDoc(doc(db, "system_settings", "certificate_config"), merged, { merge: true }),
        2500
      );
    } catch (e) {
      console.warn("[Firestore Config Write Warning - persisted locally]:", (e as Error).message);
    }
  }

  // 2. Save to /tmp
  try {
    fs.writeFileSync(tmpConfigPath, JSON.stringify(merged, null, 2), "utf-8");
  } catch {}

  // 3. Attempt local disk save (fails silently on read-only serverless filesystems like Vercel)
  try {
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(/*turbopackIgnore: true*/ dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(localConfigPath, JSON.stringify(merged, null, 2), "utf-8");
  } catch {}

  return merged;
}
