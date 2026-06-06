import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import type { Issue, ApiResult } from "@/lib/types";
import axios from "axios";
import { axiosWithProxy } from "../HttpService";

export async function getIssueById(issueId: string): Promise<ApiResult<Issue>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/issues?id=eq.${issueId}&select=*`;

  try {
    const response = await axiosWithProxy.get(url, { headers });
    const data = response.data;
    const issue = data[0] || null;
    if (!issue) return { success: false, error: "Issue not found" };
    return { success: true, data: issue };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to fetch issue" };
  }
}
