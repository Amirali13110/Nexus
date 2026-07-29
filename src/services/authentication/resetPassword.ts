"use server";

import { cookies } from "next/headers";
import { axiosWithProxy } from "../HttpService";
import { ApiResult } from "@/lib/types";

export async function resetPassword({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}): Promise<ApiResult> {
  try {
    await axiosWithProxy.post(`${process.env.BACKEND_URL}/auth/reset-password`, {
      token,
      new_password: newPassword,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.detail ??
        error.response?.data?.message ??
        error.message ??
        "Failed to reset password",
    };
  }
}
