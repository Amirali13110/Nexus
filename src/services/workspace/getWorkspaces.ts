"use server";

import { supabaseKey, supabaseUrl } from "@/utils/supabase";
import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import { ApiResult, Workspace } from "@/lib/types";

export async function getWorkspaces(): Promise<ApiResult<Workspace[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!encodedToken || !userCookie) {
    return { success: false, error: "Not authenticated" };
  }
  const accessToken = decodeURIComponent(encodedToken);
  const { id: userId } = JSON.parse(userCookie);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/workspaces?select=*&owner_id=eq.${userId}`;

  try {
    const response = await axiosWithProxy.get<Workspace[]>(url, { headers });

    const data = await response.data;

    return { success: true, data };
  } catch (error: any) {
    console.log("can't fetch");
    return {
      success: false,
      error:
        error.msg || "Failed to get workspaces check your internet connection",
    };
  }
}
