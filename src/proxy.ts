import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { auth } from "@/config/auth";
import { canAccessRoute } from "@/config/permissions";

export async function proxy(request: NextRequest) {
	const session = await auth();
	const { pathname } = request.nextUrl;

	if (
		session?.user &&
		(pathname === "/login" ||
			pathname === "/register" ||
			pathname.startsWith("/verify"))
	) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}

	if (pathname.startsWith("/dashboard")) {
		if (!session?.user) {
			return NextResponse.redirect(new URL("/login", request.url));
		}
		if (!canAccessRoute(session.user.permissions, pathname)) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/dashboard/:path*", "/login", "/register", "/verify/:path*"],
};
