import { deleteMemberAction } from "@/actions/member/DeleteMemberAction";
import { Member } from "@/lib/types";
import { useActionState } from "react";

export default function DeleteMemberForm({
  workspaceId,
  workspaceSlug,
  member,
}: {
  workspaceId: string;
  workspaceSlug: string;
  member: Member;
}) {
  const [state, formAction, isPending] = useActionState(
    deleteMemberAction,
    null,
  );
  return (
    <form action={formAction}>
      <input type="hidden" name="workspaceId" value={workspaceId} />
      <input type="hidden" name="profileId" value={member.id} />
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <button type="submit">Remove</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
