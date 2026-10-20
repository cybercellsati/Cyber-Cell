import { NextRequest, NextResponse } from "next/server";
import { getCertificateById, searchCertificates, isCertificateExpired } from "@/lib/certificates";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const query = searchParams.get("query") || searchParams.get("q");

    if (id) {
      const cert = await getCertificateById(id);
      if (!cert) {
        return NextResponse.json({ found: false, error: "Certificate not found" }, { status: 404 });
      }

      const expired = isCertificateExpired(cert);

      return NextResponse.json({
        found: true,
        certificate: {
          ...cert,
          is_expired: expired,
          is_download_active: !expired,
          status_label: expired ? "VERIFIED (DOWNLOAD WINDOW EXPIRED)" : "ACTIVE & VERIFIED",
        },
      });
    }

    if (query) {
      const results = await searchCertificates(query);
      return NextResponse.json({
        found: results.length > 0,
        count: results.length,
        certificates: results.map((cert) => {
          const expired = isCertificateExpired(cert);
          return {
            ...cert,
            is_expired: expired,
            is_download_active: !expired,
            status_label: expired ? "VERIFIED (DOWNLOAD WINDOW EXPIRED)" : "ACTIVE & VERIFIED",
          };
        }),
      });
    }

    return NextResponse.json(
      { error: "Please provide 'id' or 'query' parameter" },
      { status: 400 }
    );
  } catch (error) {
    console.error("[API Verify Error]:", error);
    return NextResponse.json(
      { error: (error as Error).message || "Internal server error" },
      { status: 500 }
    );
  }
}
