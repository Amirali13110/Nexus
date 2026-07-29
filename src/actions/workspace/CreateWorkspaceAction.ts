"use server";
import { createWorkspace } from "@/services/workspace/createWorkspace";
import { slugify } from "@/utils/slugify";
import z from "zod";

const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required").max(50),
  description: z.string().max(500).optional(),
});

export async function createWorkspaceAction(
  prevState: any,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  const validation = createWorkspaceSchema.safeParse({ name, description });
  if (!validation.success) {
    const errors = validation.error.flatten().fieldErrors;
    const firstError = errors.name?.[0] || errors.description?.[0];
    return { success: false, error: firstError || "Invalid input" };
  }


  const slug = slugify(name);
  const result = await createWorkspace({ name, slug , description});

  if (!result.data && result.error) {
    return { success: false, error: result.error };
  }
  if (!result.data) return { success: false, error: result.error };


    return {
      success: true,
      workspaces: result.data,
    };
  
}
