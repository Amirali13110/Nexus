"use server";
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

export async function forgotPasswordRequest(
  email: string,
): Promise<ApiResult<ResetPasswordRequest>> {
  const url = `${process.env.BACKEND_URL}/auth/forgot-password`;

  try {
    const response = await axiosWithProxy.post<ResetPasswordRequest>(
      url,
      {
        email: email,
      },

      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to send email",
    };
  }
}
