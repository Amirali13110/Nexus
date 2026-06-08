"use client";
import { deleteWorkspaceAction } from "@/actions/workspace/DeleteWorkspaceAction";
export default function DeleteWorkspaceButton({
  workspaceId,
}: {
  workspaceId: string;
}) {
  async function handleDelete() {
    await deleteWorkspaceAction(workspaceId);
    window.location.href = "/workspaces";
  }
  return <button onClick={handleDelete}>Delete Workspace</button>;
}
