import { notFound } from "next/navigation";
import GetWorkspaceBySlugAction from "@/actions/workspace/GetWorkspaceBySlugAction";
import WorkspaceView from "@/components/workspace/WorkspaceView";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await GetWorkspaceBySlugAction(slug);

  if (result.error) {
    return <p> {result.error || "Failed to fetch the workspace"}</p>;
  }

  if (!result.success || !result.workspace) {
    notFound();
  }

  return <WorkspaceView workspace={result.workspace} />;
}
