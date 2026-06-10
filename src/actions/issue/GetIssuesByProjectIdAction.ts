"use server";
import { cookies } from "next/headers";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { axiosWithProxy } from "@/services/HttpService";
import type { Issue, ApiResult, IssueFilters } from "@/lib/types";

export default async function getIssuesByProjectIdAction(
  projectId: string,
  filters?: IssueFilters,
): Promise<ApiResult<Issue[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized", data: [] };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  let filterString = `project_id=eq.${projectId}`;
  if (filters?.search) {
    const escapedSearch = filters.search.replace(/'/g, "''");
    filterString += `&or=(title.ilike.*${escapedSearch}*,description.ilike.*${escapedSearch}*)`;
  }
  if (filters?.status) filterString += `&status=eq.${filters.status}`;
  if (filters?.priority) filterString += `&priority=eq.${filters.priority}`;
  if (filters?.assigneeId)
    filterString += `&assignee_id=eq.${filters.assigneeId}`;

  const sortBy = filters?.sortBy || "priority";
  const sortOrder = filters?.sortOrder || "asc";
  const order = `${sortBy}.${sortOrder}`;

  const url = `${supabaseUrl}/rest/v1/issues?select=*&${filterString}&order=${order}`;
  let issues: Issue[] = [];

  try {
    const response = await axiosWithProxy.get(url, { headers });
    issues = response.data;
  } catch (error: any) {
    console.error("Failed to fetch issues:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch issues",
      data: [],
    };
  }

  if (issues.length === 0) {
    return { success: true, data: [] };
  }

  const assigneeIds = [
    ...new Set(issues.map((issue) => issue.assignee_id).filter(Boolean)),
  ];

  if (assigneeIds.length === 0) {
    return { success: true, data: issues };
  }

  const idsParam = assigneeIds.join(",");
  const profilesUrl = `${supabaseUrl}/rest/v1/profiles?select=id,username,full_name&id=in.(${idsParam})`;
  let profiles: {
    id: string;
    username: string;
    full_name?: string;
    email: string;
  }[] = [];

  try {
    const profilesRes = await axiosWithProxy.get(profilesUrl, { headers });
    profiles = profilesRes.data;
  } catch (error: any) {
    console.error("Failed to fetch assignee profiles:", error);
    return { success: true, data: issues };
  }

  const profileMap = new Map(profiles.map((p) => [p.id, p]));

  issues.forEach((issue) => {
    if (issue.assignee_id && profileMap.has(issue.assignee_id)) {
      issue.assignee = profileMap.get(issue.assignee_id);
    }
  });

  return { success: true, data: issues };
}
