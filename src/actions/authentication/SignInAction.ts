"use client";

import z from "zod";
import { useAuthStore } from "../../store/authStore";
import { redirect } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";

const signInSchema = z.object({
  identifier: z.string().min(3, "Username or Email is too short"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signInAction(prevState: any, formData: FormData) {
  const { signIn } = useAuthStore.getState();
  const { getProfile } = useProfileStore.getState();
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  const validation = signInSchema.safeParse({ identifier, password });
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  let isSuccessfull = false;

  let emailToSignIn: string = identifier;

  try {
    const profile = await getProfile({ username: identifier });

    if (profile) {
      emailToSignIn = profile.email;
    }
    const result = await signIn({
      email: emailToSignIn,
      password: password,
    });
    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    isSuccessfull = true;
  } catch {
    return {
      error: "Failed to sign in",
    };
  }
  if (isSuccessfull) {
    redirect("/");
  }
}
