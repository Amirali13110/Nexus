"use server";
import { getInvitationByToken } from "@/services/invitation/getInvitationByToken";
import { acceptInvitation } from "@/services/invitation/accesptInvitation";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";

export async function acceptInvitationByTokenAction(
  token: string,
): Promise<{ error?: string }> {
  const invitationResult = await getInvitationByToken(token);
  const invitation = invitationResult.data;
  if (!invitationResult.success)
    return { error: "Invalid or expired invitation" };

  if (!invitation) {
    return {
      error: "Can't accept invitation",
    };
  }

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) {
    cookieStore.set("pending_invite_token", token, {
      httpOnly: true,
      maxAge: 3600,
    });
    redirect("/signUp");
  }
  const { id: profileId } = JSON.parse(userCookie);

  const result = await acceptInvitation({
    invitationId: invitation.id,
    workspaceId: invitation.workspace_id,
    profileId,
    role: invitation.role,
  });
  if (!result.success) return { error: result.error };

  const workspaceResult = await getWorkspaceById(invitation.workspace_id);
  if (!workspaceResult.success || !workspaceResult.data?.slug) {
    return { error: "Workspace not found" };
  }
  const slug = workspaceResult.data.slug;
  redirect(`/workspace/${slug}`);
}
