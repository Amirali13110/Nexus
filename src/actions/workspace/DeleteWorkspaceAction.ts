"use server";
import { revalidatePath } from "next/cache";
import { deleteWorkspace } from "@/services/workspace/deleteWorkspace";

export async function deleteWorkspaceAction(workspaceId: string) {
  console.log("Deleting workspace:", workspaceId);
  const result = await deleteWorkspace(workspaceId);
  console.log("Delete result:", result);
  if (!result.success) throw new Error(result.error);
  revalidatePath("/workspaces");
  return { success: true };
}
