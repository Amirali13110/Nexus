import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function updateMemberRole({
  memberId,
  role,
}: {
  memberId: string;
  role: string;
}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const url = `${supabaseUrl}/rest/v1/workspace_members?id=eq.${memberId}`;
  const body = { role };

  try {
    const response = await axiosWithProxy.patch(url, body, { headers });
    const updated = Array.isArray(response.data) ? response.data[0] : response.data;
    return { success: true, data: updated };
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || "Failed to update member role";
    return { success: false, error: errorMsg };
  }
}