"use server";

import { updatePassword } from "@/services/authentication/UpdatePassword";
import { redirect } from "next/navigation";

import z from "zod";
import { setAuthCookies, setUserCookie } from "./AuthActions";
import { ApiResult, User } from "@/lib/types";

const updatePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default async function updatePasswordAction(
  prevState: any,
  formData: FormData,
): Promise<ApiResult<User>> {
  const password = formData.get("password") as string;
  const validation = updatePasswordSchema.safeParse({ password });
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  let isSuccessfull = false;
  try {
    const result = await updatePassword(password);

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
    console.log(data);

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
