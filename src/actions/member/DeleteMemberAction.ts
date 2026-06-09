"use server";
import { revalidatePath } from "next/cache";
import { deleteMember } from "@/services/member/deleteMember";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";
export async function deleteMemberAction(prevState: any, formData: FormData) {
  const workspaceId = formData.get("workspaceId") as string;
  const profileId = formData.get("profileId") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const role = formData.get("role") as string;

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
  if (!result.success) throw new Error(result.error);
  revalidatePath(`/workspace/${workspaceSlug}`);
}
