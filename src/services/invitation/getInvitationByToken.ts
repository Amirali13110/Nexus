import { ApiResult, Invitation } from "@/lib/types";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import axios from "axios";
import { axiosWithProxy } from "../HttpService";

export async function getInvitationByToken(
  token: string,
):Promise<ApiResult<Invitation>>{
  const url = `${supabaseUrl}/rest/v1/workspace_invitations?select=*&token=eq.${token}&status=eq.pending&expires_at=gt.now()`;
  try {
    const response = await axiosWithProxy.get(url, {
      headers: { apikey: supabaseKey },
    });
    const invitations = response.data[0] || null;

    return { success: true, data: invitations };
  } catch (error:any) {
    
    return {success:false, error: error.msg ||"Failed to get invitations"}
  }
}
