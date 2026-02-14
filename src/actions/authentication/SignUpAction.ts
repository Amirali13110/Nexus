import z, { email, success } from "zod";
import { useAuthStore } from "../../store/authStore";
import { redirect } from "next/navigation";

const signUpSchema = z.object({
  email: z.string().email("Enter a real email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function signUpAction(prevState: any, formData: FormData) {
  const { signUp } = useAuthStore.getState();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const validation = signUpSchema.safeParse({ email, password });

  if (!validation.success) {
    const fieldErrors = validation.error.flatten().fieldErrors;

    return {
      errors: fieldErrors,
    };
  }

  try {
    const result = await signUp({
      email: validation.data.email,
      password: validation.data.password,
      username,
    });

    if (!result.success) {
      return {
        success: false,
        error: result.error,
      };
    }

    if (result.success) {
      redirect("/home");
    }
    return { success: true, error: null };
  } catch (error: any) {
    return {
      error: "Failed to Sign up",
    };
  }
}
