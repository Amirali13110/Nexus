"use server";
import { revalidatePath } from "next/cache";
import { deleteWorkspace } from "@/services/workspace/deleteWorkspace";

export async function deleteWorkspaceAction(workspaceId: string) {
  const result = await deleteWorkspace(workspaceId);
  if (!result.success) throw new Error(result.error);
  revalidatePath("/workspaces");
  return { success: true };
}
