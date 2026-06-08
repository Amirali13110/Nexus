import { notFound } from "next/navigation";
import { getWorkspaceBySlug } from "@/services/workspace/getWorkspaceBySlug";
import { getMemberByProfileId } from "@/services/member/getMemberByProfileId";
import MemberProfileView from "@/components/member/MemberView";

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; memberId: string }>;
}) {
  const { workspaceSlug, memberId } = await params;

  const workspaceResult = await getWorkspaceBySlug(workspaceSlug);
  if (!workspaceResult.success) {

    notFound();
  }
  const workspace = workspaceResult.data;
  if (!workspace) notFound();

  const memberResult = await getMemberByProfileId(workspace.id, memberId);
  if (!memberResult.success) {
    notFound();
  }

  const member = memberResult.data;
  if (!member) notFound();

  return <MemberProfileView member={member} />;
}
