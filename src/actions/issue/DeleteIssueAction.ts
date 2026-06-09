"use server";
import { revalidatePath } from "next/cache";
import { deleteIssue } from "@/services/issue/deleteIssue";
import { cookies } from "next/headers";
import { getIssueById } from "@/services/issue/getIssueById";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";
import { redirect } from "next/navigation";

export async function deleteIssueAction(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  const issueId = formData.get("issueId") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const projectSlug = formData.get("projectSlug") as string;

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) return { success: false, error: "Not authenticated" };
  const { id: currentUserId } = JSON.parse(userCookie);

  const issueResult = await getIssueById(issueId);
  if (!issueResult.success || !issueResult.data)
    return { success: false, error: "Issue not found" };
  const issue = issueResult.data;

  const workspaceResult = await getWorkspaceById(issue.workspace_id);
  if (!workspaceResult.success)
    return { success: false, error: "Workspace not found" };
  const workspace = workspaceResult.data;

  const { getMemberRole } = await import("@/services/member/getMemberRole");
  const roleResult = await getMemberRole(workspace.id, currentUserId);
  const userRole = roleResult.success ? roleResult.data : null;
  const isOwner = workspace.owner_id === currentUserId;
  const isAdmin = userRole === "admin";

  if (issue.created_by !== currentUserId && !isOwner && !isAdmin) {
    return {
      success: false,
      error: "You don't have permission to delete this issue",
    };
  }

  const result = await deleteIssue(issueId);
  if (!result.success) return { success: false, error: result.error };

  revalidatePath(`/workspace/${workspaceSlug}/project/${projectSlug}`);
  redirect(`/workspace/${workspaceSlug}/project/${projectSlug}`);
}
