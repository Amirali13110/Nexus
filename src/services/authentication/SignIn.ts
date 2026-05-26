"use server";

import { supabaseKey, supabaseUrl } from "../../utils/supabase";

import { axiosWithProxy } from "../HttpService";
import { ApiResult, User, UserCredentials } from "@/lib/types";

export async function signIn(user: UserCredentials): Promise<ApiResult<User>> {
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
    const response = await axiosWithProxy.post<User>(signInUrl, body, {
      headers: headers,
    });
    const data = response?.data;
    if (!data) {
      throw new Error("No data received from auth server");
    }
    console.log(response);
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
      console.log(error);
      return {
        success: false,
        error: "Network error: Please check your internet .",
      };
    }

    return {
      success: false,
      error:
        error.msg ||
        "Unable to connect to the server . Please check your internet connection",
    };
  }
}
