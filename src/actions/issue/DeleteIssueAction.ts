"use server";

import { deleteIssue } from "@/services/issue/deleteIssue";

export async function deleteIssueAction(
  issueId: string,
): Promise<{ success: boolean; error?: string }> {
  const result = await deleteIssue(issueId);
  if (!result.success) return { success: false, error: result.error };
  return { success: true };
}
