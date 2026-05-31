"use server";
import { getIssueById } from "@/services/issue/getIssueById";
import type { ApiResult, Issue } from "@/lib/types";

export default async function GetIssueByIdAction(
  issueId: string,
): Promise<ApiResult<Issue>> {
  const result = await getIssueById(issueId);

  if (!result.success && result.error) {
    return { success: false, error: result.error };
  }

  return { success: true, data: result.data };
}
