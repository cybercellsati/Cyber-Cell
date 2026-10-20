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
 * Normalizes a scholar number value, stripping Excel float decimals (.0) and whitespace
 */
export function normalizeScholarNumber(val: unknown): string {
  if (val === undefined || val === null) return "";
  let s = String(val).trim();
  s = s.replace(/\.0+$/, "");
  return s.trim();
}

/**
 * Validates whether a cell value looks like an authentic scholar or roll number
 * Prioritizes SATI Vidisha 5-digit scholar numbers (e.g. 22104, 21045)
 */
export function isScholarValue(val: unknown): boolean {
  if (val === undefined || val === null) return false;
  const s = normalizeScholarNumber(val);
  if (!s || s.length < 3 || s.length > 25) return false;

  // SATI 5-digit Scholar Number (e.g. 22104, 21045)
  if (/^\d{5}$/.test(s)) return true;

  // SATI RGPV enrollment format (0108...)
  if (/^0108[A-Za-z0-9]+/i.test(s)) return true;

  // Typical 4 to 10 digit student IDs
  if (/^\d{4,10}$/.test(s)) return true;

  // Alphanumeric student roll numbers
  if (/^[A-Za-z0-9\/\-_]{5,20}$/.test(s) && /\d/.test(s)) return true;

  return false;
}

/**
 * Extracts a concise 2-4 letter uppercase event code from the event title
 */
export function getEventCode(eventName: string): string {
  if (!eventName) return "EVT";
  const clean = eventName.replace(/[^a-zA-Z0-9\s]/g, " ").trim();
  const words = clean.split(/\s+/).filter((w) => {
    const lower = w.toLowerCase();
    return (
      lower !== "the" &&
      lower !== "and" &&
      lower !== "of" &&
      lower !== "for" &&
      lower !== "in" &&
      !/^\d{4}$/.test(lower)
    );
  });
  if (words.length >= 2) {
    return words.slice(0, 4).map((w) => w.charAt(0).toUpperCase()).join("");
  } else if (words.length === 1 && words[0].length >= 3) {
    return words[0].slice(0, 3).toUpperCase();
  }
  return "EVT";
}

/**
 * Generates an unambiguous random salt for certificate uniqueness
 */
export function generateSalt(length = 4): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let res = "";
  for (let i = 0; i < length; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return res;
}

/**
 * Generates a globally unique, event-specific Certificate ID:
 * e.g., CYB-2026-NCDW-22104-7K2X
 * Prevents ID collisions across different events and workshops
 */
export function generateUniqueCertificateId(
  scholarNo: string,
  eventName: string,
  year: number = new Date().getFullYear()
): string {
  const code = getEventCode(eventName);
  const cleanScholar = scholarNo ? scholarNo.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() : "";
  const salt = generateSalt(4);
  if (cleanScholar) {
    return `CYB-${year}-${code}-${cleanScholar}-${salt}`;
  } else {
    return `CYB-${year}-${code}-${salt}`;
  }
}

/**
 * Formats any raw student name into clean, elegant, uniform Title Case.
 * Corrects all variations:
 * "AAYUSH pandey" -> "Aayush Pandey"
 * "YASH HARFODE"  -> "Yash Harfode"
 * "yash harfode"  -> "Yash Harfode"
 * "MOHD. ALI"     -> "Mohd. Ali"
 * "A.K. SHARMA"   -> "A.K. Sharma"
 */
export function formatStudentName(name: string): string {
  if (!name) return "";
  const cleaned = name.trim().replace(/\s+/g, " ");
  if (!cleaned) return "";

  return cleaned
    .split(" ")
    .map((word) => {
      if (!word) return "";

      // Handle hyphenated compound names like Jean-Luc or Mary-Jane
      if (word.includes("-")) {
        return word
          .split("-")
          .map((part) =>
            part ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : ""
          )
          .join("-");
      }

      // Handle initials or honorifics with dots like "A.K." or "Mohd." or "Dr."
      if (word.includes(".")) {
        return word
          .split(".")
          .map((segment) =>
            segment ? segment.charAt(0).toUpperCase() + segment.slice(1).toLowerCase() : ""
          )
          .join(".");
      }

      // Standard title case
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Lightweight, zero-dependency CDN fetch for Cloudinary raw data
 * Safe to execute in both browser and serverless environments
 */
async function fetchCloudinaryJson<T>(filename: string): Promise<T | null> {
  try {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "qtfezfsf";
    const url = `https://res.cloudinary.com/${cloudName}/raw/upload/cybercell/data/${filename}?t=${Date.now()}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

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
    recipient_name: formatStudentName(cert.recipient_name),
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
    const normalized = {
      ...c,
      recipient_name: formatStudentName(c.recipient_name),
    };
    const idx = mockCertificates.findIndex((m) => m.certificate_id === normalized.certificate_id);
    if (idx >= 0) {
      mockCertificates[idx] = normalized;
    } else {
      mockCertificates.unshift(normalized);
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
        recipient_name: formatStudentName(cert.recipient_name),
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
  const certMap = new Map<string, CertificateRecord>();

  local.forEach((c) => certMap.set(c.certificate_id, c));
  mockCertificates.forEach((c) => certMap.set(c.certificate_id, c));

  try {
    const cloudAttendees = await fetchCloudinaryJson<CertificateRecord[]>("attendees.json");
    if (Array.isArray(cloudAttendees)) {
      cloudAttendees.forEach((c) => certMap.set(c.certificate_id, c));
    }
  } catch {}

  if (isFirebaseConfigured) {
    try {
      const q = query(collection(db, "certificates"), limit(limitCount));
      const snap = await getDocs(q);
      snap.docs.forEach((d) => {
        const c = d.data() as CertificateRecord;
        certMap.set(c.certificate_id, c);
      });
    } catch (e) {
      console.warn("[Firestore getAllCertificates Warning]:", e);
    }
  }

  const list = Array.from(certMap.values());
  return list.slice(0, limitCount).map((c) => ({
    ...c,
    recipient_name: formatStudentName(c.recipient_name),
  }));
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
    return {
      ...localMatch,
      recipient_name: formatStudentName(localMatch.recipient_name),
      is_download_active: !isCertificateExpired(localMatch),
    };
  }

  const mockFound = mockCertificates.find((c) => c.certificate_id === cleanId);
  if (mockFound) {
    return {
      ...mockFound,
      recipient_name: formatStudentName(mockFound.recipient_name),
      is_download_active: !isCertificateExpired(mockFound),
    };
  }

  // Try Cloudinary CDN raw storage fallback
  try {
    const cloudAttendees = await fetchCloudinaryJson<CertificateRecord[]>("attendees.json");
    if (Array.isArray(cloudAttendees) && cloudAttendees.length > 0) {
      const match = cloudAttendees.find(
        (c: CertificateRecord) => (c.certificate_id || "").toUpperCase() === cleanId
      );
      if (match) {
        return {
          ...match,
          recipient_name: formatStudentName(match.recipient_name),
          is_download_active: !isCertificateExpired(match),
        };
      }
    }
  } catch {}

  if (!isFirebaseConfigured) return null;

  try {
    const certRef = doc(db, "certificates", cleanId);
    const snap = await getDoc(certRef);
    if (!snap.exists()) return null;

    const data = snap.data() as CertificateRecord;
    return {
      ...data,
      recipient_name: formatStudentName(data.recipient_name),
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
                recipient_name: formatStudentName(c.recipient_name),
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
          for (const sheetName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sheetName];
            if (!sheet) continue;
            const rawGrid: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
              header: 1,
              blankrows: false,
              defval: "",
            });
            if (!rawGrid || rawGrid.length === 0) continue;

            let headerRowIndex = 0;
            let nameColIdx = -1;
            let scholarColIdx = -1;
            let bestScore = -1;

            // Score rows to find the actual table header row
            for (let r = 0; r < Math.min(rawGrid.length, 15); r++) {
              const row = rawGrid[r];
              if (!Array.isArray(row)) continue;

              let nIdx = -1;
              let sIdx = -1;

              for (let c = 0; c < row.length; c++) {
                const clean = String(row[c] || "").toLowerCase().replace(/[^a-z0-9]/g, "");
                if (
                  nIdx === -1 &&
                  (clean.includes("name") || clean.includes("student") || clean.includes("participant")) &&
                  !clean.includes("college") &&
                  !clean.includes("father") &&
                  !clean.includes("event")
                ) {
                  nIdx = c;
                }
                if (
                  sIdx === -1 &&
                  !clean.includes("certificate") &&
                  !clean.includes("certid") &&
                  !clean.includes("school") &&
                  (clean.includes("scholar") ||
                    clean.includes("sch") ||
                    clean.includes("enroll") ||
                    clean.includes("roll") ||
                    clean.includes("rgpv") ||
                    clean.includes("regno") ||
                    clean === "id")
                ) {
                  sIdx = c;
                }
              }

              let score = 0;
              if (nIdx !== -1 && sIdx !== -1) score += 100;
              else if (nIdx !== -1 || sIdx !== -1) score += 20;

              const nonEmpty = row.filter((cell) => String(cell || "").trim() !== "").length;
              if (nonEmpty <= 1) score -= 50;

              if (score > bestScore && (nIdx !== -1 || sIdx !== -1)) {
                bestScore = score;
                headerRowIndex = r;
                nameColIdx = nIdx;
                scholarColIdx = sIdx;
              }
            }

            for (let r = headerRowIndex + 1; r < rawGrid.length; r++) {
              const row = rawGrid[r];
              if (!Array.isArray(row)) continue;
              let name = nameColIdx >= 0 && row[nameColIdx] ? String(row[nameColIdx]).trim() : "";
              let scholarNo = scholarColIdx >= 0 && row[scholarColIdx] ? normalizeScholarNumber(row[scholarColIdx]) : "";

              if (!name && !scholarNo) continue;
              if (!name) name = scholarNo ? `Student ${scholarNo}` : "Student";

              const certId = generateUniqueCertificateId(scholarNo, "National Cyber Defense Wargame 2026");

              records.push({
                id: `local-excel-${sheetName}-${r}`,
                certificate_id: certId,
                scholar_number: scholarNo.toUpperCase(),
                recipient_name: formatStudentName(name),
                event_name: "National Cyber Defense Wargame 2026",
                issue_date: new Date().toISOString().split("T")[0],
                expiry_date: "2030-01-01",
                image_url: "",
                is_download_active: true,
                role_or_rank: "Participant",
                issued_by: "Cyber Cell, SATI Vidisha",
                created_at: new Date().toISOString(),
              });
            }
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
  const normQuery = normalizeScholarNumber(searchQuery).toUpperCase();
  const queryWords = queryTerm.split(/\s+/).filter(Boolean);

  const localRecords = getLocalCertificates();
  const combinedMap = new Map<string, CertificateRecord>();

  localRecords.forEach((c) => combinedMap.set(c.certificate_id, c));
  mockCertificates.forEach((c) => combinedMap.set(c.certificate_id, c));

  // Global persistent sync: fetch from Cloudinary CDN across all serverless lambdas
  try {
    const cloudAttendees = await fetchCloudinaryJson<CertificateRecord[]>("attendees.json");
    if (Array.isArray(cloudAttendees) && cloudAttendees.length > 0) {
      cloudAttendees.forEach((c) => {
        combinedMap.set(c.certificate_id, c);
        if (!mockCertificates.some((m) => m.certificate_id === c.certificate_id)) {
          mockCertificates.push(c);
        }
      });
    }
  } catch (cldErr) {
    console.warn("[Cloudinary Search Fallback Warning]:", cldErr);
  }

  const allRecords = Array.from(combinedMap.values());

  const matches = allRecords
    .filter((c) => {
      const certId = (c.certificate_id || "").toUpperCase();
      const certScholar = normalizeScholarNumber(c.scholar_number || "").toUpperCase();
      const certName = formatStudentName(c.recipient_name || "").toUpperCase();
      const rawName = (c.recipient_name || "").toUpperCase();
      const certEvent = (c.event_name || "").toUpperCase();

      if (
        certId.includes(queryTerm) ||
        (normQuery && certScholar === normQuery) ||
        (normQuery && certScholar.includes(normQuery)) ||
        certName.includes(queryTerm) ||
        rawName.includes(queryTerm) ||
        certEvent.includes(queryTerm)
      ) {
        return true;
      }

      if (queryWords.length > 1) {
        return queryWords.every(
          (w) =>
            certName.includes(w) ||
            rawName.includes(w) ||
            certScholar.includes(w) ||
            certId.includes(w)
        );
      }
      return false;
    })
    .map((c) => ({
      ...c,
      recipient_name: formatStudentName(c.recipient_name),
      is_download_active: !isCertificateExpired(c),
    }));

  if (matches.length > 0) {
    return matches;
  }

  if (!isFirebaseConfigured) {
    return matches;
  }

  try {
    // 1. Direct ID lookup in Firestore
    const directDoc = await getDoc(doc(db, "certificates", queryTerm));
    if (directDoc.exists()) {
      const data = directDoc.data() as CertificateRecord;
      return [
        {
          ...data,
          recipient_name: formatStudentName(data.recipient_name),
          is_download_active: !isCertificateExpired(data),
        },
      ];
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
        return {
          ...data,
          recipient_name: formatStudentName(data.recipient_name),
          is_download_active: !isCertificateExpired(data),
        };
      });
    }

    // 3. Fallback: Query recent certificates and match
    const recentQuery = query(collection(db, "certificates"), limit(100));
    const recentSnap = await getDocs(recentQuery);
    const results: CertificateRecord[] = [];

    recentSnap.forEach((d) => {
      const c = d.data() as CertificateRecord;
      const certId = (c.certificate_id || "").toUpperCase();
      const certScholar = (c.scholar_number || "").toUpperCase();
      const certName = formatStudentName(c.recipient_name || "").toUpperCase();
      const rawName = (c.recipient_name || "").toUpperCase();
      const certEvent = (c.event_name || "").toUpperCase();

      if (
        certId.includes(queryTerm) ||
        certScholar.includes(queryTerm) ||
        certName.includes(queryTerm) ||
        rawName.includes(queryTerm) ||
        certEvent.includes(queryTerm)
      ) {
        results.push({
          ...c,
          recipient_name: formatStudentName(c.recipient_name),
          is_download_active: !isCertificateExpired(c),
        });
      }
    });

    if (results.length > 0) return results;
  } catch (error: unknown) {
    console.warn("[Firestore searchCertificates Warning]:", error);
  }

  return matches;
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
