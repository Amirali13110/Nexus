import { createWorkspace } from "@/services/workspace/createWorkspace";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { slugify } from "@/utils/slugify";
import {redirect} from "next/navigation"

export async function createWorkspaceAction(
  prevState: any,
  formData: FormData,
) {
  const workspaceName = formData.get("workspace-name") as string;
  const slug = slugify(workspaceName);

  const result = await createWorkspace({ name: workspaceName, slug });
  if (result.success) {
    return { success: true, data: result.data , redirectTo:"/workspaces" };
  }
  if (result.error) {
    return { success: false, error: result.error };
  }
  


}
