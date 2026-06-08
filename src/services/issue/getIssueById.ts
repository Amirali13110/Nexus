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

  try {
    const issueUrl = `${supabaseUrl}/rest/v1/issues?select=*&id=eq.${issueId}`;
    const issueRes = await axiosWithProxy.get(issueUrl, { headers });
    const issue = issueRes.data[0];
    if (!issue) return { success: false, error: "Issue not found" };

    if (issue.assignee_id) {
      const profileUrl = `${supabaseUrl}/rest/v1/profiles?select=*&id=eq.${issue.assignee_id}`;
      const profileRes = await axiosWithProxy.get(profileUrl, { headers });
      issue.assignee = profileRes.data[0]; // add assignee object to the issue
    }

    return { success: true, data: issue };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to fetch issue" };
  }
}
