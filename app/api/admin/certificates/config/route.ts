import { NextRequest, NextResponse } from "next/server";
import { getStoredConfig, saveStoredConfig } from "@/lib/certificateConfig";

export async function GET() {
  try {
    const config = await getStoredConfig();
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error("[API Config GET Error]:", error);
    const fallback = await getStoredConfig();
    return NextResponse.json({ success: true, config: fallback });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await saveStoredConfig(body);
    return NextResponse.json({
      success: true,
      message: "Configuration saved successfully",
      config: updated,
    });
  } catch (error) {
    console.error("[API Config POST Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to save configuration" },
      { status: 500 }
    );
  }
}
