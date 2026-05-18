"use server";
import axios from "axios";
import { supabaseKey, supabaseUrl } from "../../utils/supabase";
import { cookies } from "next/headers";
import { axiosWithProxy } from "../HttpService";



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
    const cookieStore = await cookies();
    const response = await axiosWithProxy.post(signUpUrl, body, { headers: headers });
    const { access_token } = response.data;
    if (access_token) {
      cookieStore.set("access_token", access_token, {
        expires: 7, // 7 days
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      const { data } = error.response;
      if (
        data?.code === 23505 ||
        data?.message.includes("profiles_username_key")
      ) {
        return {
          success: false,
          error: "The username is already taken , Please try a different one.",
        };
      }
      const message = error.response.data?.message || "Sign up failed";

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
