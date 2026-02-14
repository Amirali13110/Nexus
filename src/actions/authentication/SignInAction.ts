"use client";

import z from "zod";
import { useAuthStore } from "../../store/authStore";
import { redirect } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Enter a real email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signInAction(prevState: any, formData: FormData) {
  const { signIn } = useAuthStore.getState();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validation = signInSchema.safeParse({ email, password });

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;
    return {
      success: false,
      errors: fieldErrors,
    };
  }

  try {
    const result = await signIn({
      email: validation.data.email,
      password: validation.data.password,
    });
    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    if(result.success){
      redirect('/home')

    }
    
    return { success: true, error: null };
  } catch {
    return {
      error: "Failed to sign in",
    };
  }
}
