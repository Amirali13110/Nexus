"use server";
import { IssueFilters, Issue, ApiResult } from "@/lib/types";
import { getProjectIssues } from "@/services/issue/getProjectIssues";

export default async function getProjectIssuesAction(workspaceId: string,projectId: string, filters:IssueFilters
): Promise<ApiResult<Issue[]>> {
  const result = await getProjectIssues(workspaceId, projectId , filters);

  if (!result.success || !result.data) {
    return {
      success: false,
      error: result.error ?? "Failed to fetch issues.",
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
