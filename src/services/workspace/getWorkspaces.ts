"use server";

import { supabaseKey, supabaseUrl } from "@/utils/supabase";
import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function getWorkspaces() {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!encodedToken || !userCookie) {
    return { success: false, error: "Not authenticated", workspaces: [] };
  }
  const accessToken = decodeURIComponent(encodedToken);
  const { id: userId } = JSON.parse(userCookie);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/workspaces?select=*&owner_id=eq.${userId}`;

  try {
    const response = await axiosWithProxy.get(url, { headers });
    const data = await response.data;

    return { success: true, workspaces: data };
  } catch (error: any) {
    return {
      success: false,
      error: error || "Failed to get workspaces check your internet connection",
      workspaces: null,
    };
  }
}
