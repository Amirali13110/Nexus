"use server";

import z from "zod";
import { redirect } from "next/navigation";
import { setAuthCookies } from "./AuthActions";
import { signIn } from "@/services/authentication/SignIn";
import { getUserProfile } from "../../services/profile/getUserProfile";
import { Profile } from "@/lib/types";
import { cookies } from "next/headers";
import { acceptInvitationByTokenAction } from "../invitation/AcceptInvitationByTokenAction";

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

  const response = await getUserProfile({ username: identifier });
  const profile = response.data;

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

  const data = result?.data;

  if (data?.access_token) {
    await setAuthCookies(data);
  }
  const cookieStore = await cookies();
  const inviteToken = cookieStore.get("pending_invite_token")?.value;
  if (inviteToken) {
    await acceptInvitationByTokenAction(inviteToken);
  }
  return { success: true, redirectTo: "/" };
}
