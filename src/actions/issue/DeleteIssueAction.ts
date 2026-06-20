"use server";

import { deleteIssue } from "@/services/issue/deleteIssue";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function deleteIssueAction({
  deletingIssueId,
  workspaceSlug,
  projectSlug,
}: {
  deletingIssueId: string;
  workspaceSlug: string;
  projectSlug: string;
}): Promise<{ success: boolean; error?: string }> {
  const result = await deleteIssue(deletingIssueId);
  if (!result.success) return { success: false, error: result.error };
  if (result.success) {
    revalidatePath(`/workspace/${workspaceSlug}/project/${projectSlug}`);
    
  }
  return { success: true };
}
