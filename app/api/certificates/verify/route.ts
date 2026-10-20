import { NextRequest, NextResponse } from "next/server";
import {
  CertificateRecord,
  getCertificateById,
  searchCertificates,
  getAllCertificates,
  isCertificateExpired,
  formatStudentName,
} from "@/lib/certificates";
import { getActiveTemplate, getTemplateById } from "@/lib/certificateConfig";

/**
 * Enriches certificate record with its template profile (image URL, fonts, color, Y-pos)
 * If template_url is missing, dynamically resolves from event template or active template
 */
async function enrichCertificate(cert: CertificateRecord) {
  let template = null;
  if (cert.template_id) {
    template = await getTemplateById(cert.template_id);
  }
  if (!template) {
    template = await getActiveTemplate();
  }

  const expired = isCertificateExpired(cert);

  return {
    ...cert,
    recipient_name: formatStudentName(cert.recipient_name),
    template_id: cert.template_id || template?.id,
    template_url: cert.template_url || template?.templateUrl || "",
    template_font_family: cert.template_font_family || template?.fontFamily || "'Cinzel', serif",
    template_font_size: cert.template_font_size || template?.fontSize || 76,
    template_font_weight: cert.template_font_weight || template?.fontWeight || "bold",
    template_color: cert.template_color || template?.color || "#000000",
    template_y_pos: cert.template_y_pos !== undefined ? cert.template_y_pos : (template?.yPositionPercent ?? 53.5),
    template_text_transform: cert.template_text_transform || template?.textTransform || "uppercase",
    is_expired: expired,
    is_download_active: !expired,
    status_label: expired ? "VERIFIED (DOWNLOAD WINDOW EXPIRED)" : "ACTIVE & VERIFIED",
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const query = searchParams.get("query") || searchParams.get("q");
    const all = searchParams.get("all");

    if (id) {
      const cert = await getCertificateById(id);
      if (!cert) {
        return NextResponse.json({ found: false, error: "Certificate not found" }, { status: 404 });
      }

      const enriched = await enrichCertificate(cert);
      return NextResponse.json({
        found: true,
        certificate: enriched,
      });
    }

    if (all === "true" || query === "all") {
      const allCerts = await getAllCertificates(500);
      const enrichedList = await Promise.all(allCerts.map(enrichCertificate));
      return NextResponse.json({
        found: enrichedList.length > 0,
        count: enrichedList.length,
        certificates: enrichedList,
      });
    }

    if (query) {
      const results = await searchCertificates(query);
      const enrichedList = await Promise.all(results.map(enrichCertificate));
      return NextResponse.json({
        found: enrichedList.length > 0,
        count: enrichedList.length,
        certificates: enrichedList,
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
