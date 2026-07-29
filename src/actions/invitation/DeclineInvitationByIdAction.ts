"use server";
import { declineInvitation } from "@/services/invitation/declineInvitation";
import { revalidatePath } from "next/cache";

export async function declineInvitationByIdAction(formData: FormData) {
  const invitationId = formData.get("invitationId") as string;
  await declineInvitation(invitationId);
  revalidatePath("/workspace/invitations");

}
