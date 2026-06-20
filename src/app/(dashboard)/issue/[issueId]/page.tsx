import GetIssueByIdAction from "@/actions/issue/GetIssueByIdAction";
import IssueView from "@/components/issue/IssueView";
import { notFound } from "next/navigation";
import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";
import { Member, Project } from "@/lib/types";
import getProjectByIdAction from "@/actions/project/GetProjectByIdAction";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";

export default async function IssuePage({
  params,
}: {
  params: Promise<{
    issueId: string;
  }>;
}) {
  const { issueId } = await params;
  const issueResult = await GetIssueByIdAction(issueId);
  if (!issueResult.success || !issueResult.data) {
    notFound();
  }
  const issue = issueResult.data;
  const projectResult = await getProjectByIdAction(issue.project_id);
  if (!projectResult.success && projectResult.project) notFound();
  const project = projectResult.project;
  const workspaceResult = await getWorkspaceById(
    project?.workspace_id as string,
  );
  if (!workspaceResult.success && !workspaceResult.data) notFound();
  const workspace = workspaceResult.data;

  const membersResult = await getWorkspaceMembers(workspace?.id as string);
  const members = membersResult.data;
  return (
    <div>
      <IssueView
        issue={issue}
        members={members as Member[]}
        workspaceSlug={workspace?.slug as string}
        project={project as Project}
      />
    </div>
  );
}
