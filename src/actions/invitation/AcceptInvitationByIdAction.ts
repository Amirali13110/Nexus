"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { acceptInvitation } from "@/services/invitation/accesptInvitation";

export async function acceptInvitationByIdAction(formData: FormData) {
  const invitationId = formData.get("invitationId") as string;
  const workspaceId = formData.get("workspaceId") as string;
  const result = await acceptInvitation(invitationId);


  revalidatePath("/");
  redirect(`/workspace/${workspaceId}`);
}
