import { axiosWithProxy } from "@/services/HttpService";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { supabaseKey, supabaseUrl } from "@/utils/supabase";

export async function GET(request: Request) {

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/updatePassword";
  const safeNext = next.startsWith("/") ? next : "/updatePassword";

  if (!code) {
    return NextResponse.redirect(`${origin}/signIn`);
  }
  try {
    const cookieStore = await cookies();

    const verifier = cookieStore.get("sb-auth-token-code-verifier")?.value;

    if (!verifier) {
      return NextResponse.redirect(`${origin}/signIn?error=no_verifier`);
    }

    if (!verifier) {
      
      return NextResponse.redirect(`${origin}/signIn?error=session_expired`);
    }
    console.log("DEBUG -> Code:", code ? "EXISTS" : "MISSING");
    console.log("DEBUG -> Verifier:", verifier ? "EXISTS" : "MISSING");

    if (!verifier || !code) {
      throw new Error("Missing required PKCE components before fetch");
    }
    const response = await axiosWithProxy.post(
      `${supabaseUrl}/auth/v1/token?grant_type=pkce`,
      {
        auth_code: code,
        code: code,
        code_verifier: verifier,
      },
      {
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
        },
      },
    );
   
    const { access_token, refresh_token, expires_in } = response.data;
    const finalResponse = NextResponse.redirect(`${origin}${safeNext}`);
    const isProd = process.env.NODE_ENV === "production";

    finalResponse.cookies.set("access_token", access_token, {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: expires_in,
    });
    finalResponse.cookies.set("refresh_token", refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    finalResponse.cookies.delete("sb-auth-token-code-verifier");
    return finalResponse;
  } catch (error: any) {
    console.error(
      "PKCE Handshake Error:",
      error.response?.data || error.message,
    );
    return NextResponse.redirect(`${origin}/signIn?error=auth_failed`);
  }
}
