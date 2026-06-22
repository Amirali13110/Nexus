"use server";
import { getWorkspaces } from "@/services/workspace/getWorkspaces";

export default async function getWorkspacesAction() {
  const result = await getWorkspaces();

  if (result.error) {
    return { success: false, workspaces: null, error: result.error };
  }
  if (result.success) {
    return { success: true, workspaces: result.data };
  }
}
