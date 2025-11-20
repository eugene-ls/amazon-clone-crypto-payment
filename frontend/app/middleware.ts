import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || req.headers.get("authorization");

  // защищаем только /admin
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role?.id !== 1) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (e) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};