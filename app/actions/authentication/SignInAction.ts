import { signIn } from "./SignIn";

export async function signInAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const response = await signIn({ email, password });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.message || "Sign In failed!");
  }
}
