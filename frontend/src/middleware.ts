import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const isLogin = req.nextUrl.pathname === "/login";
    const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");

    if (isDashboard && !token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (isLogin && token) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/login", "/dashboard/:path*"],
};