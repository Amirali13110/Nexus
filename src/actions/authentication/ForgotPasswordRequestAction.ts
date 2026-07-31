"use server";

import z from "zod";
import { forgotPasswordRequest} from "../../services/authentication/forgotPasswordRequest";
import { ApiResult, User } from "@/lib/types";

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a real email address"),
});

export async function forgotPasswordRequestAction(
  prevState: ApiResult | null,
  formData: FormData,
): Promise<ApiResult> {
  const email = formData.get("email") as string;

  const validation = forgotPasswordSchema.safeParse({ email });

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return {
      success: false,
      fieldErrors,
    };
  }
  try {
    const result = await forgotPasswordRequest(email);
    if (!result.success && result.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
    };
  } catch (error: unknown) {
    return {
      success: false,
      error: "Failed to reset password",
    };
  }
}
