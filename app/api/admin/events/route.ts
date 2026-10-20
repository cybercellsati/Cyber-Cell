import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAllEvents, saveEvent, deleteEvent } from "@/lib/eventsStorage";

const COOKIE_NAME = "cybercell_admin_session";

async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);
    return Boolean(session && session.value === "authenticated_admin_session");
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json({ success: true, events });
  } catch (error) {
    console.error("[API Admin Events GET Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch events", events: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authorized = await isAdmin();
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const body = await req.json();
    if (!body.title || body.title.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Event title is required." },
        { status: 400 }
      );
    }

    const saved = await saveEvent(body);
    return NextResponse.json({
      success: true,
      message: "Event saved successfully.",
      event: saved,
    });
  } catch (error) {
    console.error("[API Admin Events POST Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to save event." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authorized = await isAdmin();
    if (!authorized) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Event ID is required." },
        { status: 400 }
      );
    }

    const deleted = await deleteEvent(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Event not found or failed to delete." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("[API Admin Events DELETE Error]:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || "Failed to delete event." },
      { status: 500 }
    );
  }
}
