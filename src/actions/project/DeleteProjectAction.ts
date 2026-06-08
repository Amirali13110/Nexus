"use server";
import { revalidatePath } from "next/cache";
import { deleteProject } from "@/services/project/deleteProject";
import { redirect } from "next/navigation";

export async function deleteProjectAction(
  projectId: string,
  workspaceSlug: string,
) {
  const result = await deleteProject(projectId);
  if (!result.success) throw new Error(result.error);
  revalidatePath(`/workspace/${workspaceSlug}`);
  return {
    success: true,
  };
}
