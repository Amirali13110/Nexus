"use server";
import z from "zod";
import { revalidatePath } from "next/cache";
import { updateProject } from "@/services/project/updateProfile";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
});

export async function updateProjectAction(prevState: any, formData: FormData) {
  const projectId = formData.get("projectId") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const name = (formData.get("name") as string) || undefined;
  const description = (formData.get("description") as string) || undefined;

  const validation = updateProjectSchema.safeParse({ name, description });
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const result = await updateProject({ projectId, name, description });
  if (!result.success) return { success: false, error: result.error };

  const project = result.data;
  revalidatePath(`/workspace/${workspaceSlug}/project/${project.slug}`);
  revalidatePath(
    `/workspace/${workspaceSlug}/project/${project.slug}/settings`,
  );
  return { success: true, project };
}
