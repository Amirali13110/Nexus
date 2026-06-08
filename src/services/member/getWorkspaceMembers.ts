import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function getWorkspaceMembers(workspaceId: string) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized", data: [] };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/workspace_members?select=profile_id&workspace_id=eq.${workspaceId}`;
  console.log("Request URL:", url);

  const response = await axiosWithProxy.get(url, { headers });

  console.log("Response status:", response.status);
  console.log("Response data:", response.data);
  const profileIds = response.data.map((row: any) => row.profile_id);

  if (profileIds.length === 0) {
    return { success: true, data: [] };
  }

  const members = [];
  for (const profileId of profileIds) {
    console.log(profileId);
    const profileUrl = `${supabaseUrl}/rest/v1/profiles?select=*&id=eq.${profileId}`;
    try {
      const profileRes = await axiosWithProxy.get(profileUrl, { headers });
      console.log("Profile response", profileRes);
      if (profileRes.data && profileRes.data.length > 0) {
        members.push(profileRes.data[0]);
      }
    } catch (err) {
      console.error(`Failed to fetch profile ${profileId}:`, err);
    }
  }

  return { success: true, data: members };
}
