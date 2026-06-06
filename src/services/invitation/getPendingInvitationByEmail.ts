import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import type { Invitation } from "@/lib/types";

export async function getPendingInvitationsByEmail(email: string) {
  const url = `${supabaseUrl}/rest/v1/workspace_invitations?select=*,workspace:workspace_id(id,name,slug)&email=eq.${encodeURIComponent(email)}&status=eq.pending&expires_at=gt.now()`;
  try {
    const response = await axiosWithProxy.get<Invitation[]>(url, {
      headers: { apikey: supabaseKey },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error("Failed to fetch pending invitations:", error);
    return { success: false, error: error.message, data: [] };
  }
}