import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function inviteUserByEmail({
  email,
  invitationToken,
}: {
  email: string;
  invitationToken: string;
}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const body = {
    email,
    data: { invitation_token: invitationToken },
  };

  try {
    const response = await axiosWithProxy.post(`${supabaseUrl}/auth/v1/invite`, body, { headers });
    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMsg = error.response?.data?.msg || error.message || "Invitation failed";
    return { success: false, error: errorMsg };
  }
}