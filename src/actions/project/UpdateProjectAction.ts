"use server";
import z from "zod";
import { revalidatePath } from "next/cache";
import { updateProject } from "@/services/project/updateProject";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiResult, Project } from "@/lib/types";

const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
});

export async function updateProjectAction(
  prevState: any,
  formData: FormData,
): Promise<ApiResult<Project>> {
  const projectId = formData.get("projectId") as string;
  const workspaceId = formData.get("workspaceId") as string;
  const name = (formData.get("name") as string) || undefined;
  const description = (formData.get("description") as string) || undefined;

  const validation = updateProjectSchema.safeParse({ name, description });
  if (!validation.success) {
    return {
      success: false,
      fieldErrors: validation.error.flatten().fieldErrors,
    };
  }

  const result = await updateProject({
    projectId,
    workspaceId,
    name,
    description,
  });
  if (!result.success) return { success: false, error: result.error };

  const project = result.data;
  if (project) {
    revalidatePath(`/workspace/${workspaceId}/project/${project.id}`);
    redirect(`/workspace/${workspaceId}/project/${project.id}`);
  }

  return { success: true, data: project };
}
