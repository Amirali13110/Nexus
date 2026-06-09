"use server";
import { revalidatePath } from "next/cache";
import { updateMemberRole } from "@/services/member/updateMemberRole";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";
import { cookies } from "next/headers";
export async function updateMemberRoleAction(
  prevState: any,
  formData: FormData,
) {
  const workspaceId = formData.get("workspaceId") as string;
  const profileId = formData.get("profileId") as string;
  const role = formData.get("role") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;

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
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) return { success: false, error: "Not authenticated" };
  const { id: currentUserId } = JSON.parse(userCookie);

  if (role === "owner" && profileId !== currentUserId) {
    return {
      success: false,
      error:
        "Only the current owner can be owner. Transferring ownership is not supported yet.",
    };
  }

  const result = await updateMemberRole({ profileId, role });
  if (!result.success) {
    return { success: false, error: result.error };
  }

  revalidatePath(`/workspace/${workspaceSlug}`);
  return { success: true };
}
