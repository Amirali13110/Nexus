"use server";
import { updateInvitationStatus } from "@/services/invitation/updateInvitationStatus";
import { revalidatePath } from "next/cache";

export async function declineInvitationByIdAction(formData: FormData) {
  const invitationId = formData.get("invitationId") as string;
  await updateInvitationStatus(invitationId, "declined");
  revalidatePath("/workspace/invitations");

}
