import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  // Routes
  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.includes(pathname);
  const isDashboard = pathname.startsWith("/dashboard");

  // If user is NOT logged in and tries to access dashboard
  if (!session && isDashboard) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If user IS logged in and tries to access login/register
  if (session && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Apply proxy to these routes
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};