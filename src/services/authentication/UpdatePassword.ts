"use server";

import { axiosWithProxy } from "../HttpService";
import { supabaseKey, supabaseUrl } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function updatePassword(newPassword: string) {
  const url = `${supabaseUrl}/auth/v1/user`;

  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;

  if (!encodedToken) {
    return { success: false, error: "Not authenticated" };
  }

  const actualToken = decodeURIComponent(encodedToken);

  try {
    const response = await axiosWithProxy.put(
      url,
      { password: newPassword },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${actualToken}`,
        },
      },
    );

    if(!response){
      return {success:false, error:"Failed to update password please check your internet connection!"}
    }
    if (response.data.msg) {
      return { success: false, error: response.data.msg };
    }

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error(
      "Update password Fetch Error:",
      error.response?.data.msg || error.msg,
    );
    return { success: false, error: error.response?.data.msg   };
  }
}
