"use server";
import { getWorkspaceBySlug } from "@/services/workspace/getWorkspaceBySlug";

export default async function GetWorkspaceBySlugAction(slug: string) {
  const result = await getWorkspaceBySlug(slug);
  if (result.error) {
    console.log(result.error);
    return { success: false, workspace: null, error: result.error };
  }
  return { success: true, workspace: result.workspace };
}
