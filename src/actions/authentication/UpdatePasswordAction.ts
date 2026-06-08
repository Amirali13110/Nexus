"use server";

import { updatePassword } from "@/services/authentication/UpdatePassword";
import { redirect } from "next/navigation";

import z from "zod";
import { setAuthCookies, setUserCookie } from "./AuthActions";

const updatePasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default async function updatePasswordAction(
  prevState: any,
  formData: FormData,
) {
  const password = formData.get("password") as string;
  const validation = updatePasswordSchema.safeParse({ password });
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
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

    if (data) {
      await setUserCookie(data);
    }
  } catch (error: any) {
    
    return {
      error: error || "Failed to update password",
    };
  }

  if (isSuccessfull) {
    redirect("/");
  }
}
