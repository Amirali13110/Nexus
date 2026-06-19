"use server";
import z from "zod";
import { createProject } from "@/services/project/createProject";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  description: z.string().max(500).optional(),
  workspaceId: z.string().uuid("Invalid workspace ID"),
});

export async function createProjectAction(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const description = (formData.get("description") as string) || "";
  const workspaceId = formData.get("workspaceId") as string;

  const validation = createProjectSchema.safeParse({
    name,
    description,
    workspaceId,
  });
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    const firstError =
      errors.name?.[0] || errors.workspaceId?.[0] || errors.description?.[0];
    return { success: false, error: firstError || "Invalid input" };
  }

  const result = await createProject({
    name,
    description,
    workspace_id: workspaceId,
  });
  if (!result.success && !result.data)
    return { success: false, error: result.error };

  if (!result.data?.slug) {
    return { success: false, error: result.error };
  }

  const workspaceResult = await getWorkspaceById(workspaceId);
  const workspace = workspaceResult.success ? workspaceResult.data : null;

  return {
    success: true,
  };
}
