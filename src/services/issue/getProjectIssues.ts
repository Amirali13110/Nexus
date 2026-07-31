"use server"

import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import type { Issue, ApiResult, IssueFilters } from "@/lib/types";

export async function getProjectIssues(
  projectId: string,
  workspaceId:string,
  filters:IssueFilters
): Promise<ApiResult<Issue[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${process.env.BACKEND_URL}/issues/workspaces/${workspaceId}/projects/${projectId}`;

  try {
    const response = await axiosWithProxy.get(url, { headers ,params: {
        search: filters?.search,
        issue_status: filters?.status,
        priority: filters?.priority,
        assignee_id: filters?.assigneeId,
        sort_by: filters?.sortBy,
        sort_order: filters?.sortOrder,
      }, },);
    const data = response.data as Issue[];
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response.data.detail || "Failed to fetch issues",
    };
  }
}
