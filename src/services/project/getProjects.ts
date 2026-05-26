"use server";

import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import { ApiResult, Project } from "@/lib/types";

export async function getProjectsByWorkspace(
  workspaceId: string,
): Promise<ApiResult<Project[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  const userCookie = cookieStore.get("auth_user")?.value;

  if (!encodedToken || !userCookie) {
    return { success: false, error: "Not authenticated" };
  }

  const accessToken = decodeURIComponent(encodedToken);
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/projects?select=*&workspace_id=eq.${workspaceId}&order=created_at.desc`;

  try {
    const response = await axiosWithProxy.get<Project[]>(url, { headers });
    const projects = response.data;
    return { success: true, data: projects };
  } catch (error: any) {
    console.error("Fetch projects error:", error);
    return {
      success: false,
      error:
        error.response?.data?.msg ||
        error.message ||
        "Failed to fetch projects",
    };
  }
}
