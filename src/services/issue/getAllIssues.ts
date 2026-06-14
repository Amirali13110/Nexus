// services/issue/getAllIssues.ts
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import type { ApiResult, Issue } from "@/lib/types";

export async function getAllIssues(): Promise<ApiResult<Issue[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/issues?select=*,assignee:assignee_id(*)&order=created_at.desc`;
  try {
    const response = await axiosWithProxy.get(url, { headers });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
