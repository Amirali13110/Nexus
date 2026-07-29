"use server";
import z from "zod";
import { setAuthCookies } from "./AuthActions";
import { signIn } from "@/services/authentication/SignIn";
import { ApiResult, User } from "@/lib/types";

const signInSchema = z.object({
  email: z.string().min(3, "Email is too short"),
  password: z.string(),
});

export async function signInAction(
  prevState: any,
  formData: FormData,
): Promise<ApiResult<User>> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = signInSchema.safeParse({ email, password });
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  const result = await signIn({
    email,
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

  return {
    success: true,
    message: "Sign In was successfull!",
    redirectTo: "/",
  };
}
