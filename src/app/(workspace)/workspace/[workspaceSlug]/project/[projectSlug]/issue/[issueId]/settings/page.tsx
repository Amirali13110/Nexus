import { notFound } from "next/navigation";
import { getIssueById } from "@/services/issue/getIssueById";
import { getWorkspaceBySlug } from "@/services/workspace/getWorkspaceBySlug";
import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";
import UpdateIssueForm from "@/components/issue/UpdateIssueForm";
import DeleteIssueButton from "@/components/issue/DeleteIssueButton";

export default async function EditIssuePage({
  params,
}: {
  params: Promise<{
    workspaceSlug: string;
    projectSlug: string;
    issueId: string;
  }>;
}) {
  const { workspaceSlug, projectSlug, issueId } = await params;

  const workspaceResult = await getWorkspaceBySlug(workspaceSlug);
  if (!workspaceResult.success || !workspaceResult.data) notFound();
  const workspace = workspaceResult.data;

  const issueResult = await getIssueById(issueId);
  if (!issueResult.success || !issueResult.data) notFound();
  const issue = issueResult.data;

  const membersResult = await getWorkspaceMembers(workspace.id);
  if (!membersResult.success || !membersResult.data) notFound();

  const members = membersResult.data;
  return (
    <div>
      <h1>Edit Issue</h1>
      <UpdateIssueForm
        issue={issue}
        projectId={issue.project_id}
        workspaceSlug={workspaceSlug}
        projectSlug={projectSlug}
        members={members}
      />
      <DeleteIssueButton
        projectSlug={projectSlug}
        workspaceSlug={workspace.slug}
        issueId={issueId}
      />
    </div>
  );
}
