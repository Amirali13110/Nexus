import { notFound } from "next/navigation";
import WorkspaceView from "@/components/workspace/WorkspaceView";
import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";
import getProjectsAction from "@/actions/project/GetProjectsAction";
import { Project } from "@/lib/types";
import getWorkspaceByIdAction from "@/actions/workspace/GetWorkspaceByIdAction";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  const workspaceResult = await getWorkspaceByIdAction(workspaceId);

  if (workspaceResult.error) {
    return <p> {workspaceResult.error || "Failed to fetch the workspace"}</p>;
  }

  if (!workspaceResult.success || !workspaceResult.data) {
    notFound();
  }

  const workspace = workspaceResult.data;
  const projectsResult = await getProjectsAction(workspace.id);
  const projects = projectsResult.success
    ? (projectsResult.projects as Project[])
    : [];
  const membersResult = await getWorkspaceMembers(workspace.id);
  const members = membersResult.data;

  if (!membersResult.success || !members) {
    return <p>Couldn't get members</p>;
  }

  const memberRole = members.current_user_role;

  if (!memberRole) {
    return <p>Can't get member's role </p>;
  }

  return (
    <div>
      <WorkspaceView
        workspace={workspace}
        projects={projects}
        role={memberRole}
      />
    </div>
  );
}
