// services/issue/getAllIssues.ts
"use server";
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import type { ApiResult, Issue, Profile } from "@/lib/types";

export async function getAllIssues(): Promise<ApiResult<Issue[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const issuesUrl = `${supabaseUrl}/rest/v1/issues?select=*&order=created_at.desc`;
  let issues: Issue[] = [];
  try {
    const response = await axiosWithProxy.get(issuesUrl, { headers });
    issues = response.data;
    if (issues.length === 0) return { success: true, data: [] };
  } catch (error: any) {
    return { success: false, error: error.message };
  }

  const assigneeIds = [
    ...new Set(issues.map((issue) => issue.assignee_id).filter(Boolean)),
  ];
  if (assigneeIds.length === 0) {
    return { success: true, data: issues };
  }

  const idsParam = assigneeIds.join(",");
  const profilesUrl = `${supabaseUrl}/rest/v1/profiles?select=id,username,full_name&id=in.(${idsParam})`;
  let profiles: Profile[] = [];
  try {
    const profilesRes = await axiosWithProxy.get(profilesUrl, { headers });
    profiles = profilesRes.data;
  } catch (error: any) {
    console.error("Failed to fetch assignee profiles:", error);
    return { success: true, data: issues };
  }

  const profileMap = new Map(profiles.map((p) => [p.id, p]));

  const enrichedIssues = issues.map((issue) => {
    const profile = issue.assignee_id
      ? profileMap.get(issue.assignee_id)
      : undefined;
    return {
      ...issue,
      assignee: profile
        ? {
            id: profile.id,
            username: profile.username ?? "",
            full_name: profile.full_name ?? undefined,
            email: profile.email ?? "",
          }
        : undefined,
    };
  });

  return { success: true, data: enrichedIssues };
}
