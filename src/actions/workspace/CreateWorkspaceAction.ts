import { useWorkspaceStore } from "@/store/workspaceStore";

export async function createWorkspaceAction(
  prevState: any,
  formData: FormData,
) {
  const workspaceName = formData.get("workspace-name") as string;
  const { createWorkspace } = useWorkspaceStore.getState();
  try {
    const result = await createWorkspace(workspaceName, "");
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
