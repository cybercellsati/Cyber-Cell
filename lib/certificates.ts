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
 * Calculates expiry date based on issue date and days (30, 60, or 90)
 */
export function calculateExpiryDate(issueDateStr: string, days: number = 60): string {
  const date = new Date(issueDateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

/**
 * Generates an official Cyber Cell Unique Certificate ID (e.g. CYB-2026-X8K2M1)
 */
export function generateCertificateId(eventPrefix: string = "CYB", year: number = 2026): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // No ambiguous chars (0, O, 1, I)
  let randomCode = "";
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${eventPrefix.toUpperCase()}-${year}-${randomCode}`;
}

/**
 * Save or update a single certificate record in Firestore (permanent record)
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

  if (!isFirebaseConfigured) {
    certs.forEach((c) => {
      const idx = mockCertificates.findIndex((m) => m.certificate_id === c.certificate_id);
      if (idx >= 0) {
        mockCertificates[idx] = c;
      } else {
        mockCertificates.unshift(c);
      }
    });
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
    console.error("[Firestore batchSaveCertificateRecords Error]:", error);
    throw error;
  }
}

/**
 * Fetches a single certificate by its unique Certificate ID
 */
export async function getCertificateById(certificateId: string): Promise<CertificateRecord | null> {
  const cleanId = certificateId.trim().toUpperCase();

  if (!isFirebaseConfigured) {
    const found = mockCertificates.find((c) => c.certificate_id === cleanId);
    if (found) {
      return { ...found, is_download_active: !isCertificateExpired(found) };
    }
    return null;
  }

  try {
    const certRef = doc(db, "certificates", cleanId);
    const snap = await getDoc(certRef);
    if (snap.exists()) {
      const data = snap.data() as CertificateRecord;
      return {
        ...data,
        is_download_active: !isCertificateExpired(data),
      };
    }
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err?.code === "unavailable" || err?.message?.includes("client is offline")) {
      console.warn("[Firestore getCertificateById] Offline mode active; querying local attendee sources.");
    } else {
      console.warn("[Firestore getCertificateById]:", err?.message || err);
    }
  }

  // 2. Check local Excel or JSON attendees
  const localRecords = getLocalCertificates();
  const foundLocal = localRecords.find(
    (c) => c.certificate_id === cleanId || c.scholar_number === cleanId
  );
  if (foundLocal) {
    return { ...foundLocal, is_download_active: !isCertificateExpired(foundLocal) };
  }

  // 3. Fallback to mock search if not found in db or during offline dev
  const foundMock = mockCertificates.find((c) => c.certificate_id === cleanId);
  return foundMock ? { ...foundMock, is_download_active: !isCertificateExpired(foundMock) } : null;
}

/**
 * Reads attendees dynamically from local Excel or JSON files in data/
 */
export function getLocalCertificates(): CertificateRecord[] {
  if (typeof window !== "undefined") return [];

  const records: CertificateRecord[] = [];
  try {
    const fs = require("fs");
    const path = require("path");
    const XLSX = require("xlsx");

    const excelPaths = [
      path.join(require('os').tmpdir(), 'attendees.xlsx'),
      path.join(process.cwd(), "data", "certificates.xlsx"),
      path.join(process.cwd(), "data", "attendees.xlsx"),
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
              const scholarNo = String(
                row["Scholar Number"] || row["Scholar No"] || row["scholar_number"] || row["Enrollment No"] || ""
              ).trim();
              const name = String(
                row["Name"] || row["Recipient Name"] || row["Student Name"] || row["recipient_name"] || ""
              ).trim();

              if (!name && !scholarNo) return;

              const certId = String(
                row["Certificate ID"] || row["certificate_id"] || row["Cert ID"] || `CYB-2026-${scholarNo || idx + 1}`
              ).trim().toUpperCase();

              records.push({
                id: `local-excel-${idx}`,
                certificate_id: certId,
                scholar_number: scholarNo,
                recipient_name: name,
                event_name: String(row["Event"] || row["Event Name"] || row["event_name"] || "National Cyber Defense Wargame 2026"),
                issue_date: String(row["Issue Date"] || row["issue_date"] || new Date().toISOString().split("T")[0]),
                expiry_date: "2030-01-01",
                image_url: "",
            
                is_download_active: true,
                role_or_rank: String(row["Role"] || row["role_or_rank"] || "Participant"),
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

    const jsonPath = path.join(process.cwd(), "data", "certificates.json");
    if (fs.existsSync(jsonPath)) {
      try {
        const rawJson = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
        if (Array.isArray(rawJson)) {
          rawJson.forEach((c, idx) => {
            records.push({
              ...c,
              id: c.id || `local-json-${idx}`,
              is_download_active: true,
            });
          });
        }
      } catch (e) {
        console.warn("Could not parse data/certificates.json:", e);
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

  if (!isFirebaseConfigured) {
    const combined = [...localRecords, ...mockCertificates];
    return combined
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
  }

  try {
    // 1. Direct ID lookup
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

    // 3. Fallback: Query all recent and filter by name or partial match
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
    const err = error as { code?: string; message?: string };
    if (err?.code === "unavailable" || err?.message?.includes("client is offline")) {
      console.warn("[Firestore searchCertificates] Offline mode active; querying local attendee sources.");
    } else {
      console.warn("[Firestore searchCertificates]:", err?.message || err);
    }
  }

  // Fallback to local files & mock search
  const combined = [...localRecords, ...mockCertificates];
  return combined
    .filter(
      (c) =>
        c.certificate_id.toUpperCase().includes(queryTerm) ||
        c.scholar_number.toUpperCase().includes(queryTerm) ||
        c.recipient_name.toUpperCase().includes(queryTerm)
    )
    .map((c) => ({
      ...c,
      is_download_active: !isCertificateExpired(c),
    }));
}

/**
 * Returns all issued certificates for admin directory
 */
export async function getAllCertificates(limitCount: number = 100): Promise<CertificateRecord[]> {
  const localRecords = getLocalCertificates();

  if (!isFirebaseConfigured) {
    const combined = [...localRecords, ...mockCertificates];
    const map = new Map<string, CertificateRecord>();
    combined.forEach((c) => map.set(c.certificate_id, c));
    return Array.from(map.values()).map((c) => ({
      ...c,
      is_download_active: !isCertificateExpired(c),
    }));
  }

  try {
    const q = query(collection(db, "certificates"), limit(limitCount));
    const snap = await getDocs(q);
    const map = new Map<string, CertificateRecord>();

    snap.forEach((d) => {
      const data = d.data() as CertificateRecord;
      map.set(data.certificate_id, { ...data, is_download_active: !isCertificateExpired(data) });
    });

    // Merge local records
    localRecords.forEach((c) => {
      if (!map.has(c.certificate_id)) {
        map.set(c.certificate_id, { ...c, is_download_active: !isCertificateExpired(c) });
      }
    });

    return Array.from(map.values());
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err?.code === "unavailable" || err?.message?.includes("client is offline")) {
      console.warn("[Firestore getAllCertificates] Offline mode active; querying local attendee sources.");
    } else {
      console.warn("[Firestore getAllCertificates]:", err?.message || err);
    }
    const combined = [...localRecords, ...mockCertificates];
    const map = new Map<string, CertificateRecord>();
    combined.forEach((c) => map.set(c.certificate_id, c));
    return Array.from(map.values()).map((c) => ({
      ...c,
      is_download_active: !isCertificateExpired(c),
    }));
  }
}

/**
 * Revoke or delete a certificate
 */
export async function deleteCertificate(certificateId: string): Promise<boolean> {
  const cleanId = certificateId.trim().toUpperCase();

  if (!isFirebaseConfigured) {
    mockCertificates = mockCertificates.filter((c) => c.certificate_id !== cleanId);
    return true;
  }

  try {
    await deleteDoc(doc(db, "certificates", cleanId));
    return true;
  } catch (error) {
    console.error("[Firestore deleteCertificate Error]:", error);
    return false;
  }
}
