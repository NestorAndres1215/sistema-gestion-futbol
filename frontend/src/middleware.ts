import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    const role = req.cookies.get("role")?.value;

    const path = req.nextUrl.pathname;

    const isLogin = path === "/auth/login";
    const isAdminRoute = path.startsWith("/admin");
    const isUserRoute = path.startsWith("/user");

    // 🔐 si no está logueado
    if ((isAdminRoute || isUserRoute) && !token) {
        return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    // 🚫 si ya está logueado no entra a login
    if (isLogin && token) {
        return NextResponse.redirect(new URL(role === "admin" ? "/admin/dashboard" : "/user/dashboard", req.url));
    }

    // 🔥 ADMIN SOLO ADMIN
    if (isAdminRoute && role !== "admin") {
        return NextResponse.redirect(new URL("/403", req.url));
    }

    // 🔥 USER SOLO USER (opcional pero recomendado)
    if (isUserRoute && role !== "user") {
        return NextResponse.redirect(new URL("/403", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/auth/login", "/admin/:path*", "/user/:path*"],
};