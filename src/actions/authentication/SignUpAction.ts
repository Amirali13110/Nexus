"use server";
import z, { email, success } from "zod";
import { useAuthStore } from "../../store/authStore";
import { redirect } from "next/navigation";
import { signUp } from "@/services/authentication/SignUp";
import { setAuthCookies } from "./AuthActions";
import { cookies } from "next/headers";
import { ApiResult, User } from "@/lib/types";

const signUpSchema = z.object({
  fullname: z
    .string()
    .min(3, "Full name should have at least 3 characters")
    .optional(),
  email: z.string().email("Enter a real email address"),
  username: z.string().min(4, "Please enter a valid username for sign up"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signUpAction(
  prevState: any,
  formData: FormData,
): Promise<ApiResult<User>> {
  const fullname = formData.get("fullname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const validation = signUpSchema.safeParse({
    fullname,
    email,
    password,
    username,
  });

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;

    return {
      success: false,
      fieldErrors: fieldErrors,
    };
  }

  const result = await signUp({
    email: validation.data.email,
    password: validation.data.password,
    username: validation.data.username,
    fullname: validation.data.fullname,
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

  
  return { success: true, redirectTo: "/" };
}
