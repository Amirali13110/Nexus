import { ApiResult, Member, Profile } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function getWorkspaceMembers(
  workspaceId: string,
): Promise<ApiResult<Member[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized", data: [] };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  // 1. Fetch member rows with profile_id and role
  const membersUrl = `${supabaseUrl}/rest/v1/workspace_members?select=*&workspace_id=eq.${workspaceId}`;
  const membersRes = await axiosWithProxy.get(membersUrl, { headers });
  const memberRows = membersRes.data; // each: { profile_id, role }

  if (memberRows.length === 0) return { success: true, data: [] };

  // 2. Extract profile IDs and fetch all profiles in one query
  const profileIds = memberRows.map((row: any) => row.profile_id);
  const idsParam = profileIds.join(',');
  const profilesUrl = `${supabaseUrl}/rest/v1/profiles?select=*&id=in.(${idsParam})`;
  const profilesRes = await axiosWithProxy.get(profilesUrl, { headers });
  const profiles = profilesRes.data; // array of profile objects

  // 3. Map profile_id to profile data for quick lookup
  const profileMap = new Map();
  for (const profile of profiles) {
    profileMap.set(profile.id, profile);
  }

  // 4. Build Member objects combining role and profile data
  const members: Member[] = memberRows.map((row: any) => {
    const profile = profileMap.get(row.profile_id);
    return {
      id: row.profile_id,
      profileId: row.profile_id,
      role: row.role,
      username: profile?.username,
      email: profile?.email,
      full_name: profile?.full_name,
      bio: profile?.bio,
      avatar_url: profile?.avatar_url,
    };
  });

  return { success: true, data: members };
}