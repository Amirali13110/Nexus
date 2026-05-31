"use server";
import { getIssuesByProjectId } from "@/services/issue/getIssuesByProjectId";
import type { ApiResult, Issue } from "@/lib/types";

export default async function getIssuesByProjectIdAction(
  projectId: string,
): Promise<ApiResult<Issue[]>> {
  const result = await getIssuesByProjectId(projectId);

  if (!result.success && result.error) {
    return { success: false, error: result.error };
  }

  return { success: true, data: result.data };
}
