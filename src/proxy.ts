import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateUser } from "./services/authentication/ValidateUser";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const { pathname } = request.nextUrl;
  const isCallbackPage = pathname.startsWith("/callback");
  const isAuthPage =
    pathname === "/signIn" ||
    pathname === "/signUp" ||
    pathname === "/forgetPassword";
  const isProtectedPage =
    pathname.startsWith("/") && !isAuthPage && !isCallbackPage;

  const isInviteRoute = pathname.startsWith("/invite/accept");

  if (isProtectedPage && !token && !isInviteRoute) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|callback).*)",
  ],
};
