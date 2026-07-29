import { getProjectById } from "@/services/project/getProjectById";
export default async function getProjectByIdAction({projectId, workspaceId}:{projectId:string , workspaceId:string
}) {
  const result = await getProjectById({projectId, workspaceId});
  if (!result.success && result.error) {
    return { success: false, error: result.error };
  }

  return { success: true, project: result.data };
}
