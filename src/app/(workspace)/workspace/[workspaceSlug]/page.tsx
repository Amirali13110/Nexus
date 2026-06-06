import { notFound } from "next/navigation";
import GetWorkspaceBySlugAction from "@/actions/workspace/GetWorkspaceBySlugAction";
import WorkspaceView from "@/components/workspace/WorkspaceView";
import { cookies } from "next/headers";
import { getMemberRole } from "@/services/member/getMemberRole";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;

  const result = await GetWorkspaceBySlugAction(workspaceSlug);

  if (result.error) {
    return <p> {result.error || "Failed to fetch the workspace"}</p>;
  }

  if (!result.success || !result.workspace) {
    notFound();
  }

  const workspace = result.workspace;

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

  return <WorkspaceView workspace={result.workspace} role={memberRole} />;
}
