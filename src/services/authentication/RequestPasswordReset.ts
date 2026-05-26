"use server";

import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import axios from "axios";
import { cookies } from "next/headers";
import { axiosWithProxy } from "../HttpService";
import { ApiResult, ResetPasswordRequest } from "@/lib/types";

async function getPKCE() {
  const verifier = Array.from(crypto.getRandomValues(new Uint8Array(32)), (b) =>
    b.toString(16).padStart(2, "0"),
  ).join("");
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest("SHA-256", data);

  const challenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return { verifier, challenge };
}

export async function requestPasswordReset(
  email: string,
): Promise<ApiResult<ResetPasswordRequest>> {
  const target = "http://localhost:3000/auth/callback?next=/updatePassword";
  const url = `${supabaseUrl}/auth/v1/recover`;
  const cookieStore = await cookies();
  const { verifier, challenge } = await getPKCE();

  cookieStore.set("sb-auth-token-code-verifier", verifier, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 15,
  });

  try {
    const response = await axiosWithProxy.post<ResetPasswordRequest>(
      url,
      {
        email: email,

        code_challenge: challenge,
        code_challenge_method: "s256",
        redirectTo: target,
      },

      {
        headers: {
          apikey: supabaseKey,
          "Content-Type": "application/json",
          "X-Client-Info": "supabase-js/2.48.2",
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message || error.msg || "Failed to send email",
    };
  }
}
