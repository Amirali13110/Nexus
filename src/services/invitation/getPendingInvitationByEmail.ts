import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import type { ApiResult, Invitation, Workspace } from "@/lib/types";
import { cookies } from "next/headers";

export async function getPendingInvitationsByEmail(
  email: string,
): Promise<ApiResult<Invitation[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!encodedToken || !userCookie) {
    return { success: false, error: "Not authenticated" };
  }
  const accessToken = decodeURIComponent(encodedToken);
  const url = `${supabaseUrl}/rest/v1/workspace_invitations?select=*&email=eq.${encodeURIComponent(email)}&status=eq.pending&expires_at=gt.now()`;

  try {
    const response = await axiosWithProxy.get<Invitation[]>(url, {
      headers: { apikey: supabaseKey },
    });

    const invitations = response.data;
    if (!invitations || invitations.length === 0) {
      return { success: true, data: [] };
    }

    const workspaceIds = [
      ...new Set(invitations.map((inv) => inv.workspace_id).filter(Boolean)),
    ];
    if (workspaceIds.length === 0) {
      return { success: true, data: invitations };
    }

    const idsParam = workspaceIds.join(",");
    const workspacesUrl = `${supabaseUrl}/rest/v1/workspaces?select=id,name&id=in.(${idsParam})`;

    const workspacesRes = await axiosWithProxy.get<Workspace[]>(workspacesUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const workspaces = workspacesRes.data;

    const workspaceMap = new Map(workspaces.map((ws) => [ws.id, ws]));

    const enrichedInvitations = invitations.map((inv) => {
      const workspace = inv.workspace_id
        ? workspaceMap.get(inv.workspace_id)
        : undefined;
      return {
        ...inv,
        workspace: workspace
          ? {
              id: workspace.id,
              name: workspace.name,
            }
          : undefined,
      };
    });

    return { success: true, data: enrichedInvitations as Invitation[] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
