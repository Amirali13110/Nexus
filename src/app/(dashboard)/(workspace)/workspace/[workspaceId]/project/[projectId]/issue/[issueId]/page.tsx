import GetIssueByIdAction from "@/actions/issue/GetIssueByIdAction";
import IssueView from "@/components/issue/IssueView";
import { notFound } from "next/navigation";
import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";
import { Member, Project } from "@/lib/types";
import getWorkspaceByIdAction from "@/actions/workspace/GetWorkspaceByIdAction";
import getProjectByIdAction from "@/actions/project/GetProjectByIdAction";

export default async function IssuePage({
  params,
}: {
  params: Promise<{
    workspaceId: string;
    projectId: string;
    issueId: string;
  }>;
}) {
  const { issueId, workspaceId, projectId } = await params;
  const issueResult = await GetIssueByIdAction({issueId, workspaceId , projectId});
  if (!issueResult.success || !issueResult.data) {
    notFound();
  }
  const issue = issueResult.data;
  const workspaceResult = await getWorkspaceByIdAction(workspaceId);
  if (!workspaceResult.success && !workspaceResult.data) notFound();
  const workspace = workspaceResult.data

  const projectResult = await getProjectByIdAction({
    workspaceId,
    projectId,
  });
  if (!projectResult.success && projectResult.project) notFound();
  const project = projectResult.project;

  const membersResult = await getWorkspaceMembers(workspace?.id as string);
  if (!membersResult.success || !membersResult.data) notFound();
  return (
    <div>
      <IssueView
        issue={issue}
        membersResult={membersResult.data}
        workspaceId={workspace?.id as string}
        project={project as Project}
      />
    </div>
  );
}
