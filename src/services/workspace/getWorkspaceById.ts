import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function getWorkspaceById(workspaceId: string) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized", data: null };
  const accessToken = decodeURIComponent(encodedToken);

  const url = `${supabaseUrl}/rest/v1/workspaces?select=id,name,slug&id=eq.${workspaceId}`;
  try {
    const response = await axiosWithProxy.get(url, {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${accessToken}` },
    });
    const workspace = response.data[0] || null;
    if (!workspace) return { success: false, error: "Workspace not found", data: null };
    return { success: true, data: workspace };
  } catch (error: any) {
    return { success: false, error: error.message, data: null };
  }
}