import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateUser } from "./actions/authentication/ValidateUser";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/signIn" || pathname === "signUp";
  const isProtectedPage = pathname.startsWith("/home");

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (token) {
    const { isValid } = await validateUser(token);

    if (!isValid && isProtectedPage) {
      const response = NextResponse.redirect(new URL("/signIn", request.url));
      response.cookies.delete("access_token");
      return response;
    }

    if (isValid && isAuthPage) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/home/:path*", "/signIn", "/signUp"],
};
