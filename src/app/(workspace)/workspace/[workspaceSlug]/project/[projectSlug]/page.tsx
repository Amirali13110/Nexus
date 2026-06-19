// app/workspace/[workspaceSlug]/project/[projectSlug]/page.tsx
import { notFound } from "next/navigation";
import getProjectBySlugAction from "@/actions/project/GetProjectBySlugAction";
import getIssuesByProjectIdAction from "@/actions/issue/GetIssuesByProjectIdAction";
import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";
import ProjectView from "@/components/project/ProjectView";
import { Issue, Member } from "@/lib/types";
import ProjectInitializer from "@/components/project/ProjectInitializer";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
  searchParams: Promise<{
    search?: string;
    status?: string;
    priority?: string;
    assignee?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const { search, status, priority, assignee, sort, order } =
    await searchParams;

  const projectResult = await getProjectBySlugAction({
    projectSlug,
    workspaceSlug,
  });
  if (!projectResult.success) notFound();
  const project = projectResult.project;
  if (!project) notFound();
  const membersResult = await getWorkspaceMembers(project.workspace_id);
  const members: Member[] = membersResult.success
    ? (membersResult.data as Member[])
    : [];

  const workspaceResult = await getWorkspaceById(project.workspace_id);
  console.log(workspaceResult);
  if (!workspaceResult.success) notFound();
  const workspace = workspaceResult.data;
  if (!workspace) notFound();

  const issuesResult = await getIssuesByProjectIdAction(project.id, {
    search,
    status,
    priority: priority,
    assigneeId: assignee,
    sortBy: sort || "priority",
    sortOrder: (order as "asc" | "desc") || "asc",
  });
  const issues: Issue[] = issuesResult.success
    ? (issuesResult.data as Issue[])
    : [];
  let issuesError = issuesResult.success ? null : issuesResult.error;
  if (!issuesError) {
    issuesError = null;
  }
  return (
    <div className="">
      <ProjectInitializer project={project} workspace={workspace} />
      <ProjectView
        project={project}
        issues={issues}
        members={members}
        error={issuesError}
        workspaceSlug={workspaceSlug}
      />
    </div>
  );
}
