import { supabaseKey, supabaseUrl } from "../../utils/supabase";
import axios from "axios";

type UserCredentials = {
  email: string;
  password: string;
};

export async function signIn(user: UserCredentials) {
  const body = {
    email: user.email,
    password: user.password,
  };
  const headers: {} = {
    "Content-Type": "application/json",
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };
  const signInUrl = `${supabaseUrl}/auth/v1/token?grant_type=password`;

  try {
    const response = await axios.post(signInUrl, body, { headers: headers });
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      const message =
        error.response.data?.msg ||
        error.response.data.error_description ||
        "Sign in failed";

      return {
        success: false,
        error: message || "Data validation failed",
      };
    }

    if (error.request) {
      return {
        success: false,
        error: "Network error: Please check your internet connection.",
      };
    }

    return {
      success: false,
      error:
        "Unable to connect to the server . Please check your internet connection",
    };
  }
}
