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

  const url = `${supabaseUrl}/rest/v1/workspaces?select=*&slug=eq.${slug}&owner_id=eq.${userId}`;

  try {
    const response = await axios.get<Workspace[]>(url, { headers });
    const data = response.data;

    const workspace = data[0] || null;

    return { success: true, data: workspace };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to fetch workspace",
    };
  }
}
