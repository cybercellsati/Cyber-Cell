import { NextRequest, NextResponse } from "next/server";
import {
  CertificateRecord,
  batchSaveCertificateRecords,
  calculateExpiryDate,
  getAllCertificates,
  deleteCertificate,
} from "@/lib/certificates";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { certificates, defaultEventName, defaultIssueDate, defaultExpiryDays = 365 } = body;

    if (!Array.isArray(certificates) || certificates.length === 0) {
      return NextResponse.json(
        { error: "No certificates provided in request body" },
        { status: 400 }
      );
    }

    const issuedRecords: CertificateRecord[] = [];

    // Process each certificate in batch (Zero-storage, on-demand canvas generated)
    for (const item of certificates) {
      const certId = item.certificate_id.trim().toUpperCase();
      const issueDate = item.issue_date || defaultIssueDate || new Date().toISOString().split("T")[0];
      const expiryDays = Number(item.expiry_days || defaultExpiryDays || 365);
      const expiryDate = calculateExpiryDate(issueDate, expiryDays);

      const record: CertificateRecord = {
        certificate_id: certId,
        scholar_number: item.scholar_number.trim().toUpperCase(),
        recipient_name: item.recipient_name.trim(),
        event_name: item.event_name || defaultEventName || "Cyber Cell Official Workshop",
        issue_date: issueDate,
        expiry_date: expiryDate,
        is_download_active: true,
        role_or_rank: item.role_or_rank || "Participant",
        issued_by: "Cyber Cell, SATI Vidisha",
        created_at: new Date().toISOString(),
      };

      issuedRecords.push(record);
    }

    // Persist permanent records
    await batchSaveCertificateRecords(issuedRecords);

    return NextResponse.json({
      success: true,
      count: issuedRecords.length,
      issuedCertificates: issuedRecords.map((r) => ({
        certificate_id: r.certificate_id,
        recipient_name: r.recipient_name,
        scholar_number: r.scholar_number,
        expiry_date: r.expiry_date,
      })),
    });
  } catch (error) {
    console.error("[API Issue Certificates Error]:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Failed to issue certificates" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const list = await getAllCertificates(200);
    return NextResponse.json({ success: true, count: list.length, certificates: list });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message || "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Certificate ID is required" }, { status: 400 });
    }

    const success = await deleteCertificate(id);
    return NextResponse.json({ success, message: success ? "Deleted successfully" : "Failed to delete" });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
