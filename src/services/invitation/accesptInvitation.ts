import { Invitation } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import axios from "axios";

export async function acceptInvitation({
  invitationId,
  workspaceId,
  profileId,
  role,
}: {
  invitationId: string;
  workspaceId: string;
  profileId: string;
  role: string;
}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const memberBody = {
    workspace_id: workspaceId,
    profile_id: profileId,
    role,
  };

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const checkUrl = `${supabaseUrl}/rest/v1/workspace_members?workspace_id=eq.${workspaceId}&profile_id=eq.${profileId}`;
  const checkRes = await axiosWithProxy.get(checkUrl, { headers });
  const existingMember = checkRes.data && checkRes.data.length > 0;

  if (!existingMember) {
    const memberRes = await axiosWithProxy.post(
      `${supabaseUrl}/rest/v1/workspace_members`,
      memberBody,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    if (memberRes.status !== 201)
      return { success: false, error: "Failed to add member" };
  }

  await axios.patch(
    `${supabaseUrl}/rest/v1/workspace_invitations?id=eq.${invitationId}`,
    { status: "accepted" },
    {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${accessToken}` },
    },
  );

  return { success: true };
}
