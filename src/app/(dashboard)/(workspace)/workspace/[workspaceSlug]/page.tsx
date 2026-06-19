import { notFound } from "next/navigation";
import GetWorkspaceBySlugAction from "@/actions/workspace/GetWorkspaceBySlugAction";
import WorkspaceView from "@/components/workspace/WorkspaceView";
import { cookies } from "next/headers";
import { getMemberRole } from "@/services/member/getMemberRole";
import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";
import { getUserProfile } from "@/services/profile/getUserProfile";
import MembersList from "@/components/member/MembersList";
import getProjectsAction from "@/actions/project/GetProjectsAction";
import { Project } from "@/lib/types";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;

  const workspaceResult = await GetWorkspaceBySlugAction(workspaceSlug);

  if (workspaceResult.error) {
    return <p> {workspaceResult.error || "Failed to fetch the workspace"}</p>;
  }

  if (!workspaceResult.success || !workspaceResult.workspace) {
    notFound();
  }

  const workspace = workspaceResult.workspace;
  const projectsResult = await getProjectsAction(workspace.id);
  const projects = projectsResult.success
    ? (projectsResult.projects as Project[])
    : [];
  const membersResult = await getWorkspaceMembers(workspace.id);

  const members = membersResult.data;

  if (!membersResult.success || !members) {
    return <p>Couldn't get members</p>;
  }
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  let memberRole: string | null = null;
  if (userCookie) {
    const { id: profileId } = JSON.parse(userCookie);
    const roleResult = await getMemberRole(workspace.id, profileId);
    if (roleResult.success) memberRole = roleResult.data;
  }

  if (!memberRole) {
    return <p>Can't get member's role </p>;
  }

  return (
    <div>
      <WorkspaceView
        workspace={workspaceResult.workspace}
        projects={projects}
        role={memberRole}
      />
    </div>
  );
}
