import { ApiResult } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function getMemberRole(
  workspaceId: string,
  profileId: string,
): Promise<ApiResult> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/workspace_members?select=role&workspace_id=eq.${workspaceId}&profile_id=eq.${profileId}`;
  try {
    const response = await axiosWithProxy.get(url, { headers });
    const data = response.data;
    if (data && data.length > 0) {
      return { success: true, data: data[0].role };
    }
    return {
      success: false,
      error: "User not a member of this workspace",
    };
  } catch (error: any) {
    console.error("Failed to fetch user role:", error);
    return { success: false, error: error.message };
  }
}
