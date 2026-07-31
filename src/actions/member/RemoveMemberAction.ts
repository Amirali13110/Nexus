"use server";
import { revalidatePath } from "next/cache";
import { deleteMember } from "@/services/member/deleteMember";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";

type RemoveMemberActionProps = {
  workspaceId: string;
  memberId: string;

};

export async function removeMemberAction({
  workspaceId,
  memberId,
  
}: RemoveMemberActionProps) {


  const result = await deleteMember({ workspaceId, memberId});
  if (!result.success) return { success: false, error: result.error };
  revalidatePath(`/workspace/${workspaceId}`);
  return { success: true };
}
