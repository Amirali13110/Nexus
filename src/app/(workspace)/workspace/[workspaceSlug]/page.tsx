import { notFound } from "next/navigation";
import GetWorkspaceBySlugAction from "@/actions/workspace/GetWorkspaceBySlugAction";
import WorkspaceView from "@/components/workspace/WorkspaceView";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;

  const result = await GetWorkspaceBySlugAction(workspaceSlug);

  if (result.error) {
    return <p> {result.error || "Failed to fetch the workspace"}</p>;
  }

  if (!result.success || !result.workspace) {
    notFound();
  }

  return <WorkspaceView workspace={result.workspace} />;
}
