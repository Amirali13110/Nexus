import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function updateInvitationStatus(invitationId: string, status: string) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) {
    return { success: false, error: "Unauthorized" };
  }
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const url = `${supabaseUrl}/rest/v1/workspace_invitations?id=eq.${invitationId}`;
  const body = { status };

  try {
    await axiosWithProxy.patch(url, body, { headers });
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update invitation status:", error);
    return { success: false, error: error.message };
  }
}