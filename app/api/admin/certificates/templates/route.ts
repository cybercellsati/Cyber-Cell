import { NextRequest, NextResponse } from "next/server";
import {
  getAllTemplates,
  saveTemplateProfile,
  deleteTemplateProfile,
  setActiveTemplate,
  getActiveTemplate,
} from "@/lib/certificateConfig";

export async function GET() {
  try {
    const templates = await getAllTemplates();
    const active = await getActiveTemplate();
    return NextResponse.json({
      success: true,
      templates,
      activeTemplateId: active.id,
    });
  } catch (error) {
    console.error("[Templates API GET Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Action 1: Set Active Template
    if (body.action === "set_active" && body.id) {
      const ok = await setActiveTemplate(body.id);
      if (!ok) {
        return NextResponse.json(
          { success: false, error: "Template not found" },
          { status: 404 }
        );
      }
      const templates = await getAllTemplates();
      return NextResponse.json({
        success: true,
        message: "Active template updated",
        activeTemplateId: body.id,
        templates,
      });
    }

    // Action 2: Save / Create Template Profile
    const profileData = body.profile || body;
    if (!profileData || typeof profileData !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid profile data" },
        { status: 400 }
      );
    }

    const saved = await saveTemplateProfile(profileData);
    const templates = await getAllTemplates();

    return NextResponse.json({
      success: true,
      message: "Template profile saved successfully",
      profile: saved,
      templates,
      activeTemplateId: (await getActiveTemplate()).id,
    });
  } catch (error) {
    console.error("[Templates API POST Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing template 'id' parameter" },
        { status: 400 }
      );
    }

    const ok = await deleteTemplateProfile(id);
    if (!ok) {
      return NextResponse.json(
        {
          success: false,
          error: "Cannot delete this template. Ensure it exists and is not the only template.",
        },
        { status: 400 }
      );
    }

    const templates = await getAllTemplates();
    const active = await getActiveTemplate();

    return NextResponse.json({
      success: true,
      message: "Template deleted successfully",
      templates,
      activeTemplateId: active.id,
    });
  } catch (error) {
    console.error("[Templates API DELETE Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
