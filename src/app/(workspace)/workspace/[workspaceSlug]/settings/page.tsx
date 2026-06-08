import { getWorkspaceBySlug } from "@/services/workspace/getWorkspaceBySlug";
import { notFound } from "next/navigation";
import UpdateWorkspaceForm from "@/components/workspace/UpdateWorkspaceForm";
import DeleteWorkspaceButton from "@/components/workspace/DeleteWorkspaceButton";
export default async function WorkspaceSettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const result = await getWorkspaceBySlug(workspaceSlug);
  if (!result.success) notFound();
  const workspace = result.data;

  if (!workspace) {
    notFound();
  }

  return (
    <div>
      <h1>Workspace Settings</h1>
      <UpdateWorkspaceForm workspace={workspace} />
      <DeleteWorkspaceButton workspaceId={workspace.id}/>
    </div>
  );
}
