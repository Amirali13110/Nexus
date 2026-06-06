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
  console.log("Fetching workspace with URL:", url);

  let workspace: Workspace | null = null;

  try {
    const response = await axiosWithProxy.get<Workspace[]>(url, { headers });
    const data = response.data;

    workspace = data[0] || null;
    console.log(workspace);

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

  // if (workspace.owner_id === userId) {
  //   console.log(workspace.owner_id === userId);
  //   return { success: true, data: workspace };
  // }
  // const memberUrl = `${supabaseUrl}/rest/v1/workspace_members?workspace_id=eq.${workspace.id}&profile_id=eq.${userId}&select=id`;
  // try {
  //   const memberRes = await axiosWithProxy.get(memberUrl, { headers });
  //   console.log(memberRes);
  //   if (memberRes.data && memberRes.data.length > 0) {
  //     return { success: true, data: workspace };
  //   }
  //   return { success: false, error: "You don't have access to this workspace" };
  // } catch (error: any) {
  //   return {
  //     success: false,
  //     error: error?.message || "Failed to verify membership",
  //   };
  // }
}
