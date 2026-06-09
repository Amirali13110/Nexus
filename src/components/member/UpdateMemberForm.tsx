import { updateMemberRoleAction } from "@/actions/member/UpdateMemberAction";
import { Member } from "@/lib/types";
import { useActionState } from "react";

export default function UpdateMemberForm({
  workspaceId,
  workspaceSlug,
  member,

  currentUserId,
}: {
  workspaceId: string;
  workspaceSlug: string;
  member: Member;

  currentUserId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    updateMemberRoleAction,
    null,
  );

  const isOwner = member.role === "owner";
  const isSelf = member.id === currentUserId;
  const allRoles = ["member", "admin", "owner"];
  const otherRoles = allRoles.filter((role) => role !== member.role);

  const allowedRoles = otherRoles.filter((role) => {
    if (role === "owner") return isOwner && isSelf;
    return true;
  });

  return (
    <form action={formAction}>
      <input type="hidden" name="workspaceId" value={workspaceId} />
      <input type="hidden" name="profileId" value={member.id} />
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <select
        name="role"
        defaultValue=""
        onChange={(e) => e.target.form?.requestSubmit()}
        disabled={isPending}
      >
        <option value="" disabled>
          Current: {member.role}
        </option>
        {allowedRoles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
