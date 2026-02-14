import { supabaseKey, supabaseUrl } from "../../utils/supabase";
import Cookies from "js-cookie";
import axios from "axios";

type UserCredentials = {
  email: string;
  username: string;
  password: string;
};

export async function signUp(user: UserCredentials) {
  console.log(user.username);
  const body = {
    email: user.email,
    password: user.password,
    data: {
      username: user.username,
    },
  };
  const headers: {} = {
    "Content-Type": "application/json",
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };
  const signUpUrl = `${supabaseUrl}/auth/v1/signup`;

  try {
    const response = await axios.post(signUpUrl, body, { headers: headers });

    const { access_token } = response.data;
    if (access_token) {
      Cookies.set("access_token", access_token, {
        expires: 7, // 7 days
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
    console.log(response);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      const message =
        error.response.data?.msg ||
        error.response.data.error_description ||
        "Sign up failed";

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
