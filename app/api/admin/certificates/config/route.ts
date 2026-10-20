import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const configPath = path.join(process.cwd(), "data", "certificateConfig.json");

const defaultConfig = {
  templateUrl: "/templates/certificate-template.png",
  fontFamily: "'Cinzel', serif",
  fontSize: 76,
  fontWeight: "bold",
  color: "#d4af37",
  yPositionPercent: 48.0,
  xPositionPercent: 50.0,
  letterSpacing: 2,
  textTransform: "uppercase",
  showQrCode: false,
  showCertificateId: false,
  eventName: "National Cyber Defense Wargame 2026",
  issueDate: new Date().toISOString().split("T")[0],
};

export async function GET() {
  try {
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, "utf-8");
      const config = JSON.parse(raw);
      return NextResponse.json({ success: true, config });
    }
    return NextResponse.json({ success: true, config: defaultConfig });
  } catch (error) {
    console.error("[API Config GET Error]:", error);
    return NextResponse.json({ success: true, config: defaultConfig });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = fs.existsSync(configPath)
      ? JSON.parse(fs.readFileSync(configPath, "utf-8"))
      : defaultConfig;

    const merged = {
      ...current,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(configPath, JSON.stringify(merged, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Configuration saved successfully", config: merged });
  } catch (error) {
    console.error("[API Config POST Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to save configuration" },
      { status: 500 }
    );
  }
}
