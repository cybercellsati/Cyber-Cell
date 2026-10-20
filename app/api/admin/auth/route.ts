import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET_KEY || "Cybercell$123").trim();
const COOKIE_NAME = "cybercell_admin_session";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (!password || password.trim() !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, error: "Invalid Admin Password" }, { status: 401 });
    }

    // Set HTTP-only admin session cookie valid for 7 days
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, "authenticated_admin_session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ success: true, message: "Admin authenticated successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME);

    if (session && session.value === "authenticated_admin_session") {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return NextResponse.json({ success: true, message: "Logged out" });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
