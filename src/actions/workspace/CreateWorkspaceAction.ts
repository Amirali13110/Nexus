import { createWorkspace } from "@/services/workspace/createWorkspace";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { slugify } from "@/utils/slugify";
import { redirect } from "next/navigation";
import z from "zod";

const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required").max(50),
});

export async function createWorkspaceAction(
  prevState: any,
  formData: FormData,
) {
  const workspaceName = formData.get("workspace-name") as string;

  const validation = createWorkspaceSchema.safeParse({ workspaceName });
  if (!validation.success) {
    return {
      success: false,
      error: validation.error.flatten().fieldErrors.name?.[0] || "Invalid name",
    };
  }

  const slug = slugify(workspaceName);

  const result = await createWorkspace({ name: workspaceName, slug });
  if (result.success) {
    return { success: true, data: result.data, redirectTo: "/workspaces" };
  }
  if (result.error) {
    return { success: false, error: result.error };
  }
}
