"use server";

import { requestPasswordReset } from "../../services/authentication/RequestPasswordReset";
import { getUserProfile } from "@/services/profile/getUserProfile";
export type ActionState = {
  success: boolean;
  message: string | null;
  error: string | null;
};
export async function requestPasswordResetAction(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const identifier = formData.get("identifier") as string;

  try {
    let emailToSend = identifier;

    const profile = await getUserProfile({ username: identifier });

    if (profile) {
      emailToSend = profile.email;
    }

    const result = await requestPasswordReset(emailToSend);
    if (!result.success) {
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
      error: null,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: null,
      error: "Failed to reset password",
    };
  }
}
