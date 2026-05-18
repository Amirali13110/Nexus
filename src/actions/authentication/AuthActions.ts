"use server";

import { cookies } from "next/headers";
import { signOut } from "../../services/authentication/SignOut";

export async function setAuthCookies(data: any) {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";



  if (data?.access_token) {

    // Check for null byte or other weird chars
    const hasNullByte = data.access_token.includes('\u0000');

  }

  const cleanAccessToken = data.access_token.trim().replace(/[\n\r]/g, "");
  const encodedAccessToken = encodeURIComponent(cleanAccessToken);
  const refreshToken = data.refresh_token.trim();

  cookieStore.set("access_token", encodedAccessToken, {
    httpOnly: true,
    secure: isProd,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  cookieStore.set("refresh_token",encodeURIComponent(refreshToken), {
    httpOnly: true,
    secure: isProd,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  // cookieStore.set("auth_user", JSON.stringify(data.user), {
  //   httpOnly: true, // Recommended: keep it hidden from client-side JS
  //   secure: isProd,
  //   sameSite: "lax",
  //   maxAge: 60 * 60 * 24 * 30, // Match the refresh token duration
  //   path: "/",
  // });
}

export async function handleSignOut() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (token) {
      // Hit Supabase logout
      await signOut(token);
    }

    // Clear cookies
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
    cookieStore.delete("auth_user");

    return { success: true };
  } catch (error: any) {
    console.error("Logout error:", error);
    return {
      success: false,
      error:
        error.response?.data?.msg ||
        "Could not connect to the authentication server.",
    };
  }
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  cookieStore.delete("auth_user");
}
