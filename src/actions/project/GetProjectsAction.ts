"use server";

import { getProjectsByWorkspace } from "@/services/project/getProjects";

export default async function getProjectsAction(workspaceId: string) {
  const result = await getProjectsByWorkspace(workspaceId);

  if (!result.success && result.error) {
    return { success: false, error: result.error };
  }

  return { success: true, projects: result.data };
}
