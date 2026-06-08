// services/workspace/getWorkspaceBySlug.ts
import { ApiResult, Workspace } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import axios from "axios";

export async function getWorkspaceBySlug(
  slug: string,
): Promise<ApiResult<Workspace>> {
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

  // const url = `${supabaseUrl}/rest/v1/workspaces?select=*&slug=eq.${slug}&owner_id=eq.${userId}`;
  const encodedSlug = encodeURIComponent(slug.trim());

  const url = `${supabaseUrl}/rest/v1/workspaces?select=*&slug=eq.${encodedSlug}`;

  let workspace: Workspace | null = null;

  try {
    const response = await axiosWithProxy.get<Workspace[]>(url, { headers });
    const data = response.data;

    workspace = data[0] || null;

    if (!workspace) {
      return { success: false, error: "Couldn't get workspace" };
    }
    return { success: true, data: workspace };
  } catch (error: any) {
    console.error("Supabase error details:", error.response?.data);

    return {
      success: false,
      error: error?.message || "Failed to fetch workspace",
    };
  }


}
