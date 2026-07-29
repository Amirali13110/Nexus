import { notFound } from "next/navigation";
import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";
import ProjectView from "@/components/project/ProjectView";
import { Issue } from "@/lib/types";
import ProjectInitializer from "@/components/project/ProjectInitializer";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";
import getProjectByIdAction from "@/actions/project/GetProjectByIdAction";
import getProjectIssuesAction from "@/actions/issue/GetProjectIssuesAction";

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceId: string; projectId: string }>;
  searchParams: Promise<{
    search?: string;
    status?: string;
    priority?: string;
    assignee?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const { workspaceId, projectId } = await params;
  const { search, status, priority, assignee, sort, order } =
    await searchParams;

  const projectResult = await getProjectByIdAction({
    projectId,
    workspaceId,
  });
  if (!projectResult.success || !projectResult.project) notFound();
  const project = projectResult.project;
  const membersResult = await getWorkspaceMembers(project.workspace_id);
  if (!membersResult.success || !membersResult.data) notFound();

  const workspaceResult = await getWorkspaceById(project.workspace_id);
  if (!workspaceResult.success || !workspaceResult.data) notFound();
  const workspace = workspaceResult.data;

  const issuesResult = await getProjectIssuesAction(
    project.id,
    project.workspace_id,
    {
      search,
      status,
      priority: priority,
      assigneeId: assignee,
      sortBy: sort || "priority",
      sortOrder: (order as "asc" | "desc") || "asc",
    },
  ); 
  const issues: Issue[] = issuesResult.success
    ? (issuesResult.data as Issue[])
    : [];
  let issuesError = issuesResult.success ? null : issuesResult.error;
  if (!issuesError) {
    issuesError = null;
  }

  const memberRole = membersResult.data?.current_user_role;

  if (!memberRole) {
    return <p>Can't get member's role </p>;
  }

  return (
    <div className="">
      <ProjectInitializer project={project} workspace={workspace} />
      <ProjectView
        project={project}
        issues={issues}
        membersResult={membersResult.data}
        error={issuesError}
        role={memberRole}
        workspaceId={workspaceId}
      />
    </div>
  );
}
