import { NextResponse } from "next/server";
import { getAllEvents } from "@/lib/eventsStorage";

export async function GET() {
  try {
    const events = await getAllEvents();
    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("[API Events GET Error]:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch events", events: [] },
      { status: 500 }
    );
  }
}
