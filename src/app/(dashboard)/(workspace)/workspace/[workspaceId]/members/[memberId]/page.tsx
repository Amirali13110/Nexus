import { notFound } from "next/navigation";
import { getMemberById } from "@/services/member/getMemberById";
import MemberView from "@/components/member/MemberView";
import getWorkspaceByIdAction from "@/actions/workspace/GetWorkspaceByIdAction";
export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ workspaceId: string; memberId: string }>;
}) {
  const { workspaceId, memberId } = await params;
  const workspaceResult = await getWorkspaceByIdAction(workspaceId);
  if (!workspaceResult.success || !workspaceResult.data) notFound();
  const workspace = workspaceResult.data;

  const memberResult = await getMemberById({
    workspaceId: workspace.id,
    memberId,
  });
  if (!memberResult.success || !memberResult.data) notFound();
  const member = memberResult.data;
  return <MemberView member={member} />;
}
