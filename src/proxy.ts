import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function proxy(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Check admin routes (including product management)
    if ((pathname.startsWith("/dashboard/admin") || pathname.startsWith("/dashboard/products")) && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Since the matcher catches all /dashboard routes, unauthenticated users will be caught by withAuth
    // and redirected to /login automatically.

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/checkout/:path*"],
};
