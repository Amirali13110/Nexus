"use server";
import { ApiResult, User, UserCredentials } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";

export async function signIn(user: UserCredentials): Promise<ApiResult<User>> {
  const body = {
    email: user.email,
    password: user.password,
  };

  const headers: {} = {
    "Content-Type": "application/json",
  };
  const signInUrl = `${process.env.BACKEND_URL}/auth/signin`;

  try {
    const response = await axiosWithProxy.post<User>(signInUrl, body, {
      headers: headers,
    });
    const data = response?.data;
    if (!data) {
      throw new Error("No data received from auth server");
    }
    return { success: true, data: response.data };
  } catch (error: any) {


    if (error.response) {
      const {data} = error.response

      return {
        success: false,
        error: data.detail || "Sign In Failed",
      };
    }

    if (error.request) {
      return {
        success: false,
        error: "Network error: Please check your internet .",
      };
    }

    return {
      success: false,
      error:
        error.response.data.detail ||
        "Unable to connect to the server . Please check your internet connection",
    };
  }
}

