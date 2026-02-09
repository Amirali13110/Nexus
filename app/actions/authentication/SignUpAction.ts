import { signUp } from "./SignUp";

export async function signUpAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await signUp({ email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Sign Up failed!");
  }
}
