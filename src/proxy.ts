import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshAuthCookies } from "./actions/authentication/AuthActions";
import { redirect } from "next/navigation";

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const { pathname } = request.nextUrl;
  const isCallbackPage = pathname.startsWith("/callback");
  const isAuthPage =
    pathname === "/signIn" ||
    pathname === "/signUp" ||
    pathname === "/forgetPassword";
  const isProtectedPage =
    pathname.startsWith("/") && !isAuthPage && !isCallbackPage ;

  const isInviteRoute = pathname.startsWith("/invite/accept");

  if (isProtectedPage && !accessToken && refreshToken) {
    try {
      const result = await refreshAuthCookies(refreshToken);
      if (!result.success) {
        redirect("/signIn");
      }
    } catch (err: any) {
      redirect("/signIn");
    }
  }

  if (isProtectedPage && !accessToken && !isInviteRoute) {
    return NextResponse.redirect(new URL("/signIn", request.url));
  }

  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public|callback).*)"],
};
