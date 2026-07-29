"use server";
import { revalidatePath } from "next/cache";
import { deleteProject } from "@/services/project/deleteProject";
import { redirect } from "next/navigation";

export async function deleteProjectAction(
  projectId: string,
  workspaceId: string,
) {
  const result = await deleteProject({projectId, workspaceId});
  if (!result.success) throw new Error(result.error);
  if (result.success) {
    revalidatePath(`/workspace/${workspaceId}`);
    redirect(`/workspace/${workspaceId}`);
  }
  return {
    success: true,
  };
}
