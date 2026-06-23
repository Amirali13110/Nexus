"use server";
import z from "zod";
import { createInvitation } from "@/services/invitation/createInvitation";
import { cookies } from "next/headers";
import { checkProfileExistsByEmail } from "@/services/profile/checkProfileExistsByEmail";
import { inviteUserByEmail } from "@/services/invitation/inviteUserByEmail";
// import { sendInviteEmail } from "@/services/email/sendInviteEmail";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";

const inviteSchema = z.object({
  workspaceId: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(["member", "admin"]).default("member"),
});

export async function inviteWorkspaceMemberAction(
  prevState: any,
  formData: FormData,
) {
  const workspaceId = formData.get("workspaceId") as string;
  const workspaceResult = await getWorkspaceById(workspaceId);
  const workspaceName = workspaceResult.success
    ? workspaceResult.data.name
    : undefined;
  const email = formData.get("email") as string;
  const role = (formData.get("role") as string) || "member";

  const validation = inviteSchema.safeParse({ workspaceId, email, role });
  if (!validation.success)
    return { success: false, error: validation.error.issues[0].message };

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) return { success: false, error: "Not authenticated" };
  const { email: currentUserEmail } = JSON.parse(userCookie);

  if (email === currentUserEmail) {
    return {
      success: false,
      error: "You cannot invite yourself to a workspace",
    };
  }

  const profileExists = await checkProfileExistsByEmail(email);

  const invitationResult = await createInvitation({ workspaceId, email, role });
  console.log(invitationResult);
  if (!invitationResult.success || !invitationResult.data) {
    return {
      success: false,
      error: invitationResult.error || "Failed to create invitation",
    };
  }
  const invitationArray = Array.isArray(invitationResult.data)
    ? invitationResult.data
    : [invitationResult.data];

  const invitation = invitationArray[0];
  if (!invitation.token) {
    return {
      success: false,
      error: "Failed to create invitation (missing token)",
    };
  }

  if (!profileExists) {
    // const emailResult = await sendInviteEmail({
    //   to: email,
    //   invitationToken: invitation.token,
    //   workspaceName,
    // });
    // if (!emailResult.success) return { error: emailResult.error };
    return {
      success: false,
      message: `Your member doesn't have account on nexus please invite him`,
    };
  }

  return { success: true, message: `Invitation sent to ${email}` };
}
