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
  console.log("Action is runing", email);

  const validation = forgotPasswordSchema.safeParse({ email });
  console.log("Before validation fails");

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    console.log("Bug is from field errors", fieldErrors);
    return {
      success: false,
      fieldErrors,
    };
  }
  try {
    console.log("Trying to get result");
    const result = await forgotPasswordRequest(email);
    console.log("Here is the result", result);
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
    console.log(error);
    return {
      success: false,
      error: "Failed to reset password",
    };
  }
}
