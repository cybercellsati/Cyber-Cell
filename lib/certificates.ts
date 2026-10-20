import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";

export interface CertificateRecord {
  id?: string;
  certificate_id: string; // e.g. "CYB-2026-A1B2C3"
  scholar_number: string; // e.g. "0108CS221001"
  recipient_name: string; // e.g. "Aarav Sharma"
  event_name: string; // e.g. "National Cyber Defense Wargame 2026"
  issue_date: string; // "2026-10-19"
  expiry_date: string; // "2027-01-17" (Issue date + 60 or 90 days)
  image_url?: string; // Optional direct image url
  template_id?: string; // ID of the specific Canva template/event profile
  template_url?: string; // Cloudinary Canva template image URL for this event
  template_font_family?: string;
  template_font_size?: number;
  template_font_weight?: string;
  template_color?: string;
  template_y_pos?: number;
  template_text_transform?: "uppercase" | "capitalize" | "none";
  is_download_active: boolean; // True while within validity window, false after expiry
  role_or_rank?: string; // "Winner", "1st Runner Up", "Participant", "Lead Organizer"
  issued_by?: string; // "Cyber Cell, SATI Vidisha"
  created_at?: string;
}

// In-memory mock database for fallback testing when offline/dev
let mockCertificates: CertificateRecord[] = [];

/**
 * Checks whether a certificate's download window has expired
 */
export function isCertificateExpired(cert: CertificateRecord): boolean {
  if (!cert.expiry_date) return false;
  const expiry = new Date(cert.expiry_date);
  const now = new Date();
  return now.getTime() > expiry.getTime();
}

/**
 * Calculates standard validity expiry date
 */
export function calculateExpiryDate(issueDateStr: string, validityDays = 60): string {
  const date = new Date(issueDateStr || Date.now());
  date.setDate(date.getDate() + validityDays);
  return date.toISOString().split("T")[0];
}

/**
 * Generates a unique, official Certificate ID
 */
export function generateCertificateId(year: number = new Date().getFullYear()): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed ambiguous characters like 0, O, 1, I
  let randomPart = "";
  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CYB-${year}-${randomPart}`;
}

/**
 * Saves a new certificate record to Cloud Firestore (or mock DB if offline)
 */
export async function saveCertificateRecord(cert: CertificateRecord): Promise<void> {
  const isExpired = isCertificateExpired(cert);
  const normalizedCert: CertificateRecord = {
    ...cert,
    certificate_id: cert.certificate_id.trim().toUpperCase(),
    scholar_number: cert.scholar_number.trim().toUpperCase(),
    recipient_name: cert.recipient_name.trim(),
    is_download_active: !isExpired,
    created_at: cert.created_at || new Date().toISOString(),
  };

  if (!isFirebaseConfigured) {
    // Save to local mock store
    const existingIndex = mockCertificates.findIndex(
      (c) => c.certificate_id === normalizedCert.certificate_id
    );
    if (existingIndex >= 0) {
      mockCertificates[existingIndex] = normalizedCert;
    } else {
      mockCertificates.unshift(normalizedCert);
    }
    return;
  }

  try {
    const certRef = doc(db, "certificates", normalizedCert.certificate_id);
    await setDoc(certRef, normalizedCert, { merge: true });
  } catch (error) {
    console.error("[Firestore saveCertificateRecord Error]:", error);
    throw error;
  }
}

/**
 * Batch saves multiple certificate records (for bulk Excel/CSV issuance)
 */
export async function batchSaveCertificateRecords(certs: CertificateRecord[]): Promise<number> {
  if (certs.length === 0) return 0;

  // Always update in-memory cache as well
  certs.forEach((c) => {
    const idx = mockCertificates.findIndex((m) => m.certificate_id === c.certificate_id);
    if (idx >= 0) {
      mockCertificates[idx] = c;
    } else {
      mockCertificates.unshift(c);
    }
  });

  if (!isFirebaseConfigured) {
    return certs.length;
  }

  try {
    const batch = writeBatch(db);
    certs.forEach((cert) => {
      const isExpired = isCertificateExpired(cert);
      const normalizedCert: CertificateRecord = {
        ...cert,
        certificate_id: cert.certificate_id.trim().toUpperCase(),
        scholar_number: cert.scholar_number.trim().toUpperCase(),
        recipient_name: cert.recipient_name.trim(),
        is_download_active: !isExpired,
        created_at: cert.created_at || new Date().toISOString(),
      };
      const certRef = doc(db, "certificates", normalizedCert.certificate_id);
      batch.set(certRef, normalizedCert, { merge: true });
    });

    await batch.commit();
    return certs.length;
  } catch (error) {
    console.warn("[Firestore batchSaveCertificateRecords Warning]:", error);
    return certs.length;
  }
}

/**
 * Fetches all issued certificates (combining local registry, memory, and Firestore)
 */
export async function getAllCertificates(limitCount = 100): Promise<CertificateRecord[]> {
  const local = getLocalCertificates();
  const allInMemory = [...local, ...mockCertificates];

  if (!isFirebaseConfigured) {
    return allInMemory.slice(0, limitCount);
  }

  try {
    const q = query(collection(db, "certificates"), limit(limitCount));
    const snap = await getDocs(q);
    const firestoreCerts: CertificateRecord[] = snap.docs.map((d) => d.data() as CertificateRecord);

    const certMap = new Map<string, CertificateRecord>();
    allInMemory.forEach((c) => certMap.set(c.certificate_id, c));
    firestoreCerts.forEach((c) => certMap.set(c.certificate_id, c));
    return Array.from(certMap.values()).slice(0, limitCount);
  } catch (e) {
    console.warn("[Firestore getAllCertificates Warning]:", e);
    return allInMemory.slice(0, limitCount);
  }
}

/**
 * Fetches a single certificate by its unique Certificate ID
 */
export async function getCertificateById(certificateId: string): Promise<CertificateRecord | null> {
  const cleanId = certificateId.trim().toUpperCase();

  // Check local attendee sources first
  const localRecords = getLocalCertificates();
  const localMatch = localRecords.find((c) => c.certificate_id.toUpperCase() === cleanId);
  if (localMatch) {
    return { ...localMatch, is_download_active: !isCertificateExpired(localMatch) };
  }

  const mockFound = mockCertificates.find((c) => c.certificate_id === cleanId);
  if (mockFound) {
    return { ...mockFound, is_download_active: !isCertificateExpired(mockFound) };
  }

  if (!isFirebaseConfigured) return null;

  try {
    const certRef = doc(db, "certificates", cleanId);
    const snap = await getDoc(certRef);
    if (!snap.exists()) return null;

    const data = snap.data() as CertificateRecord;
    return {
      ...data,
      is_download_active: !isCertificateExpired(data),
    };
  } catch (error) {
    console.error("[Firestore getCertificateById Error]:", error);
    return null;
  }
}

/**
 * Extracts a column value from a row using case-insensitive candidate keys
 */
function getRowValue(row: Record<string, unknown>, candidateKeys: string[]): string {
  const rowKeys = Object.keys(row);
  for (const candidate of candidateKeys) {
    const cleanCandidate = candidate.toLowerCase().replace(/[^a-z0-9]/g, "");
    const foundKey = rowKeys.find(
      (k) => k.toLowerCase().replace(/[^a-z0-9]/g, "") === cleanCandidate
    );
    if (foundKey && row[foundKey] !== undefined && row[foundKey] !== null) {
      const val = String(row[foundKey]).trim();
      if (val) return val;
    }
  }
  return "";
}

/**
 * Safely reads attendees from local files (JSON and XLSX)
 */
export function getLocalCertificates(): CertificateRecord[] {
  if (typeof window !== "undefined") return [];

  const records: CertificateRecord[] = [];
  try {
    const fs = require("fs");
    const path = require("path");
    const os = require("os");
    const XLSX = require("xlsx");

    // 1. Check JSON attendees first (Fastest & most accurate)
    const jsonPaths = [
      path.join(os.tmpdir(), "attendees.json"),
      path.join(process.cwd(), "data", "attendees.json"),
      path.join(process.cwd(), "data", "certificates.json"),
    ];

    for (const jPath of jsonPaths) {
      if (fs.existsSync(/*turbopackIgnore: true*/ jPath)) {
        try {
          const raw = JSON.parse(fs.readFileSync(/*turbopackIgnore: true*/ jPath, "utf-8"));
          if (Array.isArray(raw)) {
            raw.forEach((c) => {
              records.push({
                ...c,
                is_download_active: true,
              });
            });
          }
        } catch {}
      }
    }

    // 2. Check Excel files
    const excelPaths = [
      path.join(os.tmpdir(), "attendees.xlsx"),
      path.join(process.cwd(), "data", "attendees.xlsx"),
      path.join(process.cwd(), "data", "certificates.xlsx"),
    ];

    for (const filePath of excelPaths) {
      if (fs.existsSync(/*turbopackIgnore: true*/ filePath)) {
        try {
          const fileBuf = fs.readFileSync(/*turbopackIgnore: true*/ filePath);
          const workbook = XLSX.read(fileBuf, { type: "buffer" });
          const firstSheet = workbook.SheetNames[0];
          if (firstSheet) {
            const rawRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
            rawRows.forEach((row, idx) => {
              const name = getRowValue(row, [
                "name", "recipient name", "student name", "full name", "participant name", "candidate name", "student"
              ]);
              const scholarNo = getRowValue(row, [
                "scholar number", "scholar no", "scholar no.", "scholarno", "enrollment number", "enrollment no", "roll no", "id"
              ]);

              if (!name && !scholarNo) return;

              const certId = (
                getRowValue(row, ["certificate id", "cert id", "certificate no", "id"]) ||
                `CYB-2026-${scholarNo || idx + 1}`
              ).trim().toUpperCase();

              // Avoid duplicate if already loaded from JSON
              if (records.some((r) => r.certificate_id === certId)) return;

              records.push({
                id: `local-excel-${idx}`,
                certificate_id: certId,
                scholar_number: scholarNo,
                recipient_name: name || `Student ${idx + 1}`,
                event_name: getRowValue(row, ["event", "event name", "workshop"]) || "National Cyber Defense Wargame 2026",
                issue_date: getRowValue(row, ["issue date", "date"]) || new Date().toISOString().split("T")[0],
                expiry_date: "2030-01-01",
                image_url: "",
                is_download_active: true,
                role_or_rank: getRowValue(row, ["role", "rank", "position"]) || "Participant",
                issued_by: "Cyber Cell, SATI Vidisha",
                created_at: new Date().toISOString(),
              });
            });
          }
        } catch (e) {
          console.warn("Could not parse excel file:", filePath, e);
        }
      }
    }
  } catch (err) {
    console.warn("Error reading local certificate sources:", err);
  }

  return records;
}

/**
 * Searches certificates by Scholar Number, Certificate ID, or Recipient Name
 */
export async function searchCertificates(searchQuery: string): Promise<CertificateRecord[]> {
  const queryTerm = searchQuery.trim().toUpperCase();
  if (!queryTerm) return [];

  const localRecords = getLocalCertificates();
  const allInMemory = [...localRecords, ...mockCertificates];

  const inMemoryMatches = allInMemory
    .filter(
      (c) =>
        c.certificate_id.toUpperCase().includes(queryTerm) ||
        c.scholar_number.toUpperCase().includes(queryTerm) ||
        c.recipient_name.toUpperCase().includes(queryTerm) ||
        c.event_name.toUpperCase().includes(queryTerm)
    )
    .map((c) => ({
      ...c,
      is_download_active: !isCertificateExpired(c),
    }));

  if (inMemoryMatches.length > 0) {
    return inMemoryMatches;
  }

  if (!isFirebaseConfigured) {
    return inMemoryMatches;
  }

  try {
    // 1. Direct ID lookup in Firestore
    const directDoc = await getDoc(doc(db, "certificates", queryTerm));
    if (directDoc.exists()) {
      const data = directDoc.data() as CertificateRecord;
      return [{ ...data, is_download_active: !isCertificateExpired(data) }];
    }

    // 2. Query by Scholar Number
    const scholarQuery = query(
      collection(db, "certificates"),
      where("scholar_number", "==", queryTerm),
      limit(20)
    );
    const scholarSnap = await getDocs(scholarQuery);
    if (!scholarSnap.empty) {
      return scholarSnap.docs.map((d) => {
        const data = d.data() as CertificateRecord;
        return { ...data, is_download_active: !isCertificateExpired(data) };
      });
    }

    // 3. Fallback: Query recent certificates and partial match
    const recentQuery = query(collection(db, "certificates"), limit(100));
    const recentSnap = await getDocs(recentQuery);
    const results: CertificateRecord[] = [];

    recentSnap.forEach((d) => {
      const c = d.data() as CertificateRecord;
      if (
        c.certificate_id.toUpperCase().includes(queryTerm) ||
        c.scholar_number.toUpperCase().includes(queryTerm) ||
        c.recipient_name.toUpperCase().includes(queryTerm) ||
        c.event_name.toUpperCase().includes(queryTerm)
      ) {
        results.push({ ...c, is_download_active: !isCertificateExpired(c) });
      }
    });

    if (results.length > 0) return results;
  } catch (error: unknown) {
    console.warn("[Firestore searchCertificates Warning]:", error);
  }

  return inMemoryMatches;
}

/**
 * Deletes a certificate
 */
export async function deleteCertificate(certificateId: string): Promise<boolean> {
  const cleanId = certificateId.trim().toUpperCase();

  // Remove from mock store
  const mockIdx = mockCertificates.findIndex((c) => c.certificate_id === cleanId);
  if (mockIdx >= 0) {
    mockCertificates.splice(mockIdx, 1);
  }

  if (!isFirebaseConfigured) return true;

  try {
    const certRef = doc(db, "certificates", cleanId);
    await deleteDoc(certRef);
    return true;
  } catch (error) {
    console.error("[Firestore deleteCertificate Error]:", error);
    return false;
  }
}
