"use server";

import { deleteIssue } from "@/services/issue/deleteIssue";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function deleteIssueAction({
  deletingIssueId,
  workspaceId,
  projectId,
}: {
  deletingIssueId: string;
  workspaceId: string;
  projectId: string;
}): Promise<{ success: boolean; error?: string }> {
  const result = await deleteIssue({issueId:deletingIssueId , workspaceId , projectId});
  if (!result.success) return { success: false, error: result.error };
  if (result.success) {
    revalidatePath(`/workspace/${workspaceId}/project/${projectId}`);
    
  }
  return { success: true };
}
