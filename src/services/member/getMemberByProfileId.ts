import { ApiResult, Member } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function getMemberByProfileId(
  workspaceId: string,
  profileId: string,
): Promise<ApiResult<Member>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const memberUrl = `${supabaseUrl}/rest/v1/workspace_members?select=*&workspace_id=eq.${workspaceId}&profile_id=eq.${profileId}`;
  let memberRow;
  try {
    const memberRes = await axiosWithProxy.get(memberUrl, { headers });
    if (!memberRes.data || memberRes.data.length === 0) {
      return { success: false, error: "Member not found in this workspace" };
    }
    memberRow = memberRes.data[0];
  } catch (error: any) {
    return {
      success: false,
      error: `Failed to fetch member: ${error.message}`,
    };
  }

  const profileUrl = `${supabaseUrl}/rest/v1/profiles?select=*&id=eq.${profileId}`;
  let profile;
  try {
    const profileRes = await axiosWithProxy.get(profileUrl, { headers });
    if (!profileRes.data || profileRes.data.length === 0) {
      return { success: false, error: "Profile not found" };
    }
    profile = profileRes.data[0];
  } catch (error: any) {
    return {
      success: false,
      error: `Failed to fetch profile: ${error.message}`,
    };
  }

  const member = {
    id: profile.id,
    username: profile.username,
    email: profile.email,
    full_name: profile.full_name,
    bio: profile.bio,
    avatar_url: profile.avatar_url,
    role: memberRow.role,
    joined_at: memberRow.joined_at,
  };

  return { success: true, data: member };
}
