import { notFound } from "next/navigation";
import getProjectBySlugAction from "@/actions/project/GetProjectBySlugAction";
import ProjectView from "@/components/project/ProjectView";
import getIssuesByProjectIdAction from "@/actions/issue/GetIssuesByProjectIdAction";
import ProjectInitializer from "@/components/project/ProjectInitializer";
import { getWorkspaceBySlug } from "@/services/workspace/getWorkspaceBySlug";
import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";

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

  const workspaceResult = await getWorkspaceBySlug(workspaceSlug);
  if (!workspaceResult.success) notFound();
  const workspace = workspaceResult.data;

  if (!workspace) {
    notFound();
  }

  const projectResult = await getProjectBySlugAction({
    projectSlug,
    workspaceSlug,
  });
  if (!projectResult.success) notFound();

  const project = projectResult.project;

  if (!project) {
    return notFound();
  }

  const issuesResult = await getIssuesByProjectIdAction(project.id, {
    search,
    status,
    priority,
    assigneeId: assignee,
    sortBy: sort,
    sortOrder: order as "asc" | "desc",
  });
  const issues = issuesResult.success ? issuesResult.data || [] : [];
  const issuesError = issuesResult.success
    ? null
    : issuesResult.error || "Failed to get issues";

  const membersResult = await getWorkspaceMembers(project.workspace_id);
  if (!membersResult.success) {
    return <p>Failed to get workspace members: {membersResult.error}</p>;
  }
  const members = membersResult.data;
  if (!members) {
    return <p>Failed to get workspace members</p>;
  }

  return (
    <div>
      <ProjectView
        project={project}
        issues={issues}
        error={issuesError}
        members={members}
      />

      <ProjectInitializer project={project} workspace={workspace} />
    </div>
  );
}
