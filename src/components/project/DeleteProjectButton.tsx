"use client";
import { deleteProjectAction } from "@/actions/project/DeleteProjectAction";
export default function DeleteProjectButton({
  projectId,
  workspaceSlug,
}: {
  projectId: string;
  workspaceSlug: string;
}) {
  async function handleDelete() {
    await deleteProjectAction(projectId, workspaceSlug);
    window.location.href = `/workspace/${workspaceSlug}`;
  }
  return <button onClick={handleDelete}>Delete Project</button>;
}
