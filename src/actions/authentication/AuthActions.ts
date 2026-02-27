"use server";
import { useAuthStore } from "@/store/authStore";
import { cookies } from "next/headers";
import { signOut } from "./SignOut";

export async function setAuthCookies(data: any) {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";

  cookieStore.set("access_token", data.access_token, {
    httpOnly: true,
    secure: isProd,
    maxAge: 60 * 60, // 30 days
    path: "/",
  });
  cookieStore.set("refresh_token", data.refresh_token, {
    httpOnly: true,
    secure: isProd,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
  cookieStore.set("auth_user", JSON.stringify(data.user), {
    httpOnly: true, // Recommended: keep it hidden from client-side JS
    secure: isProd,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // Match the refresh token duration
    path: "/",
  });
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
