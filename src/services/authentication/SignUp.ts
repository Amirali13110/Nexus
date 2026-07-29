"use server";

import { cookies } from "next/headers";
import { axiosWithProxy } from "../HttpService";
import { ApiResult, User, UserCredentials } from "@/lib/types";

export async function signUp(user: UserCredentials): Promise<ApiResult<User>> {
  const body = {
    email: user.email,
    password: user.password,
    username: user.username,
    fullname: user.fullname,
  };
  const headers: {} = {
    "Content-Type": "application/json",
  };
  const signUpUrl = `${process.env.BACKEND_URL}/auth/signup`;

  try {
    const cookieStore = await cookies();
    const response = await axiosWithProxy.post<User>(signUpUrl, body, {
      headers: headers,
    });
    const { access_token } = response.data;
    if (access_token) {
      cookieStore.set("access_token", access_token, {
        expires: 7,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
    return { success: true, data: response.data };
  } catch (error: any) {
    if (error.response) {
      const { data } = error.response;
      return {
        success: false,
        error: data.detail || "Sign Up Failed",
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
        error.detail ||
        "Unable to connect to the server . Please check your internet connection",
    };
  }
}
