import { getWorkspaceMembers } from "@/services/member/getWorkspaceMembers";
import { notFound } from "next/navigation";
import MembersList from "@/components/member/MembersList";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";
export default async function WorkspaceMembersPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const workspaceResult = await getWorkspaceById(workspaceId);
  if (!workspaceResult.success) notFound();
  const workspace = workspaceResult.data;

  if (!workspace) notFound();

  const membersResult = await getWorkspaceMembers(workspace.id);
  if (!membersResult || !membersResult.success || !membersResult.data)
    notFound();

  const currentUserRole = membersResult.data?.current_user_role;
  if (!currentUserRole) notFound();

  return (
    <MembersList
      membersResult={membersResult.data}
      workspaceId={workspace.id}
      currentUserRole={currentUserRole}
    />
  );
}
