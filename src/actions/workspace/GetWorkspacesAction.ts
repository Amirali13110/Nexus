"use server";
import { getWorkspaces } from "@/services/workspace/getWorkspaces";
import { error } from "console";

export default async function getWorkspacesAction() {
  const result = await getWorkspaces();

  if (result.error) {
    console.log(error)
    return { success: false, workspaces: null, error: result.error };
  }
  if (result.success) {
    // console.log(result.workspaces);
    return { success: true, workspaces: result.workspaces };
  }
}
