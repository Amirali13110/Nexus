"use server";

import z from "zod";
import { requestPasswordReset } from "../../services/authentication/RequestPasswordReset";
import { ApiResult, User } from "@/lib/types";

const resetPasswordSchema = z.object({
  email: z.string().email("Enter a real email address"),
});

export async function requestPasswordResetAction(
  prevState: ApiResult | null,
  formData: FormData,
): Promise<ApiResult> {
  const email = formData.get("email") as string;

  const validation = resetPasswordSchema.safeParse(email);

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return {
      success: false,
      fieldErrors,
    };
  }
  try {
    const result = await requestPasswordReset(email);
    if (!result.success && result.error) {
      return {
        success: false,
        message: "Some thing went wrong",
        error: result.error,
      };
    }

    return {
      success: true,
      message:
        "IF an account exists, A reset link has been sent to your email!",
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: "Failed to reset password",
    };
  }
}
