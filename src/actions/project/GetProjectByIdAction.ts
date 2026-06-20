import { getProjectById } from "@/services/project/getProjectById";
export default async function getProjectByIdAction(projectId: string) {
  const result = await getProjectById(projectId);

  if (!result.success && result.error) {
    return { success: false, error: result.error };
  }

  return { success: true, project: result.data };
}
