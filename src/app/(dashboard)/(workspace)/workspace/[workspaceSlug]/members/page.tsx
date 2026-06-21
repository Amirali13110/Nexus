import { cookies } from "next/headers";
import { getWorkspaceBySlug } from "@/services/workspace/getWorkspaceBySlug";
import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";
import { getMemberRole } from "@/services/member/getMemberRole";
import { notFound } from "next/navigation";
import MembersList from "@/components/member/MembersList";
export default async function WorkspaceMembersPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string }>;
}) {
  const { workspaceSlug } = await params;
  const workspaceResult = await getWorkspaceBySlug(workspaceSlug);
  if (!workspaceResult.success) notFound();
  const workspace = workspaceResult.data;

  if (!workspace) notFound();

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) return <p>Not authenticated</p>;
  const { id: currentUserId } = JSON.parse(userCookie);

  const roleResult = await getMemberRole(workspace.id, currentUserId);

  if (!roleResult.success) {
    console.error("Failed to get member role:", roleResult.error);
    notFound();
  }

  const currentUserRole = roleResult.data;

  if (!currentUserRole) notFound();
  const membersResult = await getWorkspaceMembers(workspace.id);
  const members = membersResult.success ? membersResult.data : [];
  if (!members) notFound();

  return (
    <MembersList
      members={members}
      workspaceId={workspace.id}
      workspaceSlug={workspaceSlug}
      currentUserRole={currentUserRole}
      currentUserId={currentUserId}
    />
  );
}
