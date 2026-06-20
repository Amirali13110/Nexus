"use server";
import { addWorkspaceMember } from "@/services/member/addWorkspaceMember";
import { updateInvitationStatus } from "@/services/invitation/updateInvitationStatus";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";
import { error } from "console";
import { revalidatePath } from "next/cache";

export async function acceptInvitationByIdAction(formData: FormData) {
  const invitationId = formData.get("invitationId") as string;
  const workspaceId = formData.get("workspaceId") as string;
  const role = formData.get("role") as string;

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) throw new Error("Not authenticated");
  const { id: profileId } = JSON.parse(userCookie);

  const addResult = await addWorkspaceMember({ workspaceId, profileId, role });
  if (!addResult.success) throw new Error(addResult.error);

  await updateInvitationStatus(invitationId, "accepted");
  const workspaceResult = await getWorkspaceById(workspaceId);

  const workspace = workspaceResult.data;
  revalidatePath("/");
  redirect(`/workspace/${workspace.slug}`);
}
