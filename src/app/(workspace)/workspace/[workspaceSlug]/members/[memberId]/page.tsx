import { notFound } from "next/navigation";
import { getWorkspaceBySlug } from "@/services/workspace/getWorkspaceBySlug";
import { getMemberByProfileId } from "@/services/member/getMemberByProfileId";
export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; memberId: string }>;
}) {
  const { workspaceSlug, memberId } = await params;
  const workspaceResult = await getWorkspaceBySlug(workspaceSlug);
  if (!workspaceResult.success) notFound();
  const workspace = workspaceResult.data;
  if (!workspace) notFound();

  const memberResult = await getMemberByProfileId(workspace.id, memberId);
  if (!memberResult.success) notFound();
  const member = memberResult.data;
  if (!member) notFound();
  return (
    <div>
      <h1>{member.full_name || member.username}</h1>
      <p>Username: {member.username}</p>
      <p>Email: {member.email}</p>
      <p>Role: {member.role}</p>
      <p>Joined: {new Date(member.joined_at).toLocaleDateString()}</p>
      {member.bio && <p>Bio: {member.bio}</p>}
      {member.avatar_url && (
        <img src={member.avatar_url} alt="Avatar" width="100" />
      )}
    </div>
  );
}
