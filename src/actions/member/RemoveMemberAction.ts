"use server";
import { revalidatePath } from "next/cache";
import { deleteMember } from "@/services/member/deleteMember";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";

type RemoveMemberActionProps = {
  workspaceId: string;
  profileId: string;
  workspaceSlug: string;
  role: string;
};

export async function removeMemberAction({
  workspaceId,
  profileId,
  workspaceSlug,
  role,
}: RemoveMemberActionProps) {
  const workspaceResult = await getWorkspaceById(workspaceId);
  if (!workspaceResult.success) {
    return { success: false, error: "Workspace not found" };
  }
  const workspace = workspaceResult.data;
  if (workspace.owner_id === profileId && role !== "owner") {
    return {
      success: false,
      error: "Cannot change the workspace owner's role",
    };
  }

  const result = await deleteMember({ workspaceId, profileId });
  if (!result.success) return { success: false, error: result.error };
  revalidatePath(`/workspace/${workspaceSlug}`);
  return { success: true };
}
