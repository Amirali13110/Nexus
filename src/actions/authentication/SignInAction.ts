"use server";

import z, { success } from "zod";
import { redirect } from "next/navigation";
import { setAuthCookies } from "./AuthActions";
import { signIn } from "@/services/authentication/SignIn";
import { getUserProfile } from "../profile/getUserProfile";

const signInSchema = z.object({
  identifier: z.string().min(3, "Username or Email is too short"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signInAction(prevState: any, formData: FormData) {
  const identifier = formData.get("identifier") as string;
  const password = formData.get("password") as string;

  const validation = signInSchema.safeParse({ identifier, password });
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.flatten().fieldErrors,
    };
  }

  let emailToSignIn: string = identifier;
  let isSuccessfull = false;
  try {
    const profile = await getUserProfile({ username: identifier });

    if (profile) {
      emailToSignIn = profile.email;
    }
    const result = await signIn({
      email: emailToSignIn,
      password: password,
    });

    if (!result.success) {
      console.log(result.error);
      return {
        success: false,
        error: result.error,
      };
    }

    const data = result?.data;

    if (result.success) {
      isSuccessfull = true;
    }

    if (data?.access_token) {
      await setAuthCookies(data);
    }
  } catch {
    return {
      error: "Failed to sign in",
    };
  }
  if (isSuccessfull) {
    redirect("/");
  }
}
