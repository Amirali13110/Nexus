import { supabaseKey, supabaseUrl } from "@/app/utils/supabase";
import axios from "axios";

type UserCredentials = {
  email: string;
  password: string;
};

export async function signUp(user: UserCredentials) {
  const body = {
    email: user.email,
    password: user.password,
  };
  const headers: {} = {
    "Content-Type": "application/json",
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };
  const signUpUrl = `${supabaseUrl}/auth/v1/signup`;

  try {
    const response = await axios.post(signUpUrl, body, { headers: headers });
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error?.response?.data?.msg || "Sign Up failed!");
    }
    throw new Error("An unexpected error occurred!");
  }
}
