"use client";

import { deleteIssueAction } from "@/actions/issue/DeleteIssueAction";

export default function DeleteIssueButton({
  issueId,
  workspaceSlug,
  projectSlug,
}: {
  issueId: string;
  workspaceSlug: string;
  projectSlug: string;
}) {
  async function handleDelete() {
    const formData = new FormData();
    formData.append("issueId", issueId);
    formData.append("workspaceSlug", workspaceSlug);
    formData.append("projectSlug", projectSlug);
    await deleteIssueAction(formData);
  }
  return <button onClick={handleDelete}>Delete Issue</button>;
}
