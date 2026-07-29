"use server";
import { revalidatePath } from "next/cache";
import { updateMemberRole } from "@/services/member/updateMemberRole";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";
export async function updateMemberRoleAction(
  prevState: any,
  formData: FormData,
) {
  const workspaceId = formData.get("workspaceId") as string;
  const memberId = formData.get("memberId") as string;
  const role = formData.get("role") as string;

  const workspaceResult = await getWorkspaceById(workspaceId);
  if (!workspaceResult.success) {
    return { success: false, error: "Workspace not found" };
  }


  const result = await updateMemberRole({ memberId, workspaceId, role });
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/workspace/${workspaceId}`);
  return { success: true };
}
