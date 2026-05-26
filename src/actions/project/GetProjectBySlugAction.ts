import { getProjectBySlug } from "@/services/project/getProjectBySlug";

export default async function getProjectBySlugAction({
  workspaceSlug,
  projectSlug,
}: {
  workspaceSlug: string;
  projectSlug: string;
}) {
  const result = await getProjectBySlug({ workspaceSlug, projectSlug });

  if (!result.success && result.error) {
    return { success: false, error: result.error };
  }

  return { success: true, project: result.data };
}
