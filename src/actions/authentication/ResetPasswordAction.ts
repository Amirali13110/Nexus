"use server";

import { resetPassword } from "@/services/authentication/resetPassword";
import { redirect } from "next/navigation";

import z from "zod";
import { setAuthCookies, setUserCookie } from "./AuthActions";
import { ApiResult, User } from "@/lib/types";

const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default async function resetPasswordAction(
  prevState: any,
  formData: FormData,
): Promise<ApiResult<User>> {
  const password = formData.get("password") as string;
  const token = formData.get("token") as string;
  const validation = resetPasswordSchema.safeParse({ password });
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  let isSuccessfull = false;
  try {
    const result = await resetPassword({newPassword:password , token});

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    if (result.success) {
      isSuccessfull = true;
    }
    const data = result?.data;

    if (data) {
      await setUserCookie(data);
    }
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error || "Failed to update password",
    };
  }
}
