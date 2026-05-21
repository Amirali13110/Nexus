import { createWorkspace } from "@/services/workspace/createWorkspace";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { slugify } from "@/utils/slugify";

export async function createWorkspaceAction(
  prevState: any,
  formData: FormData,
) {
  const workspaceName = formData.get("workspace-name") as string;
  const slug = slugify(workspaceName);
  try {
    const result = await createWorkspace({ name: workspaceName, slug });
    if (result.success) {
      return { success: true, data: result.data };
    }
    if (result.error) {
      return { success: false, error: result.error };
    }
  } catch (error: any) {
    return {
      success: false,
      error:
        error.message || error.response.message || "Workspace creation failed",
    };
  }
}
