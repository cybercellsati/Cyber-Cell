import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Protect all /admin UI routes except /admin/login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("cybercell_admin_session");

    if (!session || session.value !== "authenticated_admin_session") {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protect all /api/admin/* endpoints except /api/admin/auth and public GET on config
  if (pathname.startsWith("/api/admin") && pathname !== "/api/admin/auth") {
    // Allow public GET to read template/font coordinates for certificate rendering
    if (pathname === "/api/admin/certificates/config" && request.method === "GET") {
      return NextResponse.next();
    }

    const session = request.cookies.get("cybercell_admin_session");

    if (!session || session.value !== "authenticated_admin_session") {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Valid admin session required" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/api/admin/:path*"],
};
