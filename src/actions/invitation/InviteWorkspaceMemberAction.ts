"use server";
import z from "zod";
import { createInvitation } from "@/services/invitation/createInvitation";


const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["member", "admin"]).default("member"),
});

export async function inviteWorkspaceMemberAction(
  prevState: any,
  formData: FormData,
) {
  const workspaceId = formData.get("workspaceId") as string;
  const email = formData.get("email") as string;
  const role = (formData.get("role") as string) || "member";

  const validation = inviteSchema.safeParse({ email, role });
  if (!validation.success)
    return { success: false, error: validation.error.issues[0].message };

  const invitationResult = await createInvitation({ workspaceId, email, role });
  if (!invitationResult.success || !invitationResult.data) {
    return {
      success: false,
      error: invitationResult.error || "Failed to create invitation",
    };
  }
  return { success: true, message: `Invitation sent to ${email}` };
}
