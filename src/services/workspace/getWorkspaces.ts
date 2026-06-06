// "use server";

// import { supabaseKey, supabaseUrl } from "@/utils/supabase";
// import { axiosWithProxy } from "../HttpService";
// import { cookies } from "next/headers";
// import { ApiResult, Workspace } from "@/lib/types";
// import axios from "axios";

// export async function getWorkspaces(): Promise<ApiResult<Workspace[]>> {
//   const cookieStore = await cookies();
//   const encodedToken = cookieStore.get("access_token")?.value;
//   const userCookie = cookieStore.get("auth_user")?.value;
//   if (!encodedToken || !userCookie) {
//     return { success: false, error: "Not authenticated" };
//   }
//   const accessToken = decodeURIComponent(encodedToken);
//   const { id: userId } = JSON.parse(userCookie);

//   const headers = {
//     apikey: supabaseKey,
//     Authorization: `Bearer ${accessToken}`,
//   };

//   const url = `${supabaseUrl}/rest/v1/workspaces?select=*&owner_id=eq.${userId}`;
//   try {
//     const response = await axiosWithProxy.get<Workspace[]>(url, { headers });

//     const data = await response.data;

//     return { success: true, data };
//   } catch (error: any) {
//     console.log("can't fetch");
//     return {
//       success: false,
//       error:
//         error.msg || "Failed to get workspaces check your internet connection",
//     };
//   }
// }
// services/workspace/getWorkspaces.ts
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function getWorkspaces() {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!encodedToken || !userCookie) {
    return { success: false, error: "Not authenticated", workspaces: [] };
  }
  const accessToken = decodeURIComponent(encodedToken);
  const { id: userId } = JSON.parse(userCookie);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  let ownedWorkspaces = [];
  let memberWorkspaces = [];

  // 1. Get workspaces where user is the owner
  const ownedUrl = `${supabaseUrl}/rest/v1/workspaces?select=*&owner_id=eq.${userId}`;
  try {
    const ownedRes = await axiosWithProxy.get(ownedUrl, { headers });
    ownedWorkspaces = ownedRes.data;
  } catch (err) {
    console.error("Error fetching owned workspaces:", err);
  }

  // 2. Get workspace IDs where user is a member (from workspace_members)
  const memberIdsUrl = `${supabaseUrl}/rest/v1/workspace_members?select=workspace_id&profile_id=eq.${userId}`;
  let workspaceIds: string[] = [];
  try {
    const memberIdsRes = await axiosWithProxy.get(memberIdsUrl, { headers });
    workspaceIds = memberIdsRes.data.map((row: any) => row.workspace_id);
  } catch (err) {
    console.error("Error fetching member workspace IDs:", err);
  }

  // 3. If there are workspace IDs, fetch the corresponding workspaces
  if (workspaceIds.length > 0) {
    const idsParam = workspaceIds.join(',');
    const memberWorkspacesUrl = `${supabaseUrl}/rest/v1/workspaces?select=*&id=in.(${idsParam})`;
    try {
      const memberRes = await axiosWithProxy.get(memberWorkspacesUrl, { headers });
      memberWorkspaces = memberRes.data;
    } catch (err) {
      console.error("Error fetching member workspaces:", err);
    }
  }

  // 4. Combine and deduplicate (owner might also be a member)
  const allWorkspaces = [...ownedWorkspaces, ...memberWorkspaces];
  const uniqueWorkspaces = allWorkspaces.filter((ws, index, self) =>
    index === self.findIndex((w) => w.id === ws.id)
  );

  return { success: true, data: uniqueWorkspaces };
}