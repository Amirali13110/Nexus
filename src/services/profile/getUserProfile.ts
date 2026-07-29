"use server"

import { ApiResult, Profile } from "@/lib/types";
import { cookies } from "next/headers"
import { axiosWithProxy } from "../HttpService";





export async function getUserProfile(): Promise<ApiResult<Profile>> {
  const cookieStore = await cookies()
  const access_token = cookieStore.get("access_token")?.value
  if (!access_token) {
    return {
      success: false,
      error: "No access token found",
    };
  }

  try {
    const response = await axiosWithProxy.get<Profile>(
      `${process.env.BACKEND_URL}/profile/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };

  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.detail ||
        "Failed to get user profile",
    };
  }
}