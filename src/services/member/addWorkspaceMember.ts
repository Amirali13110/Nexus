import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import axios from "axios";
import { cookies } from "next/headers";

export async function addWorkspaceMember({
  workspaceId,
  profileId,
  role = "member",
}: {
  workspaceId: string;
  profileId: string;
  role?: string;
}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Prefer: "return=minimal",
  };

  const body = {
    workspace_id: workspaceId,
    profile_id: profileId,
    role,
  };

  try {
    await axiosWithProxy.post(`${supabaseUrl}/rest/v1/workspace_members`, body, { headers });
    return { success: true };
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || "Failed to add member";
    return { success: false, error: errorMsg };
  }
}