"use server";
import { revalidatePath } from "next/cache";
import { deleteWorkspace } from "@/services/workspace/deleteWorkspace";

export async function deleteWorkspaceAction(workspaceId: string) {
  const result = await deleteWorkspace(workspaceId);
  if (!result.success) return { success: false, error: result.error };

  if (result.success) {
    revalidatePath("/", "layout");
    return { success: true };
  }
}
