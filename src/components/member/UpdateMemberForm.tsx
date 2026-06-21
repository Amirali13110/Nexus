import { updateMemberRoleAction } from "@/actions/member/UpdateMemberAction";
import { Member } from "@/lib/types";
import { useActionState, useEffect } from "react";
import RemoveMemberButton from "./RemoveMemberButton";

export default function UpdateMemberForm({
  workspaceId,
  workspaceSlug,
  member,
  onSuccess,
  currentUserId,
}: {
  workspaceId: string;
  workspaceSlug: string;
  member: Member;
  onSuccess: () => void;

  currentUserId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    updateMemberRoleAction,
    null,
  );

  useEffect(function () {
    if (state?.success) onSuccess();
  }, [state?.success]);

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
      <label
        htmlFor="role"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Member role
      </label>
      <div className="flex justify-between sm:grid-cols-2 gap-4">
        <select
          name="role"
          id="role"
          defaultValue=""
          onChange={(e) => e.target.form?.requestSubmit()}
          disabled={isPending}
          className="w-full rounded-xl cursor-pointer border border-gray-300 bg-white px-2 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
        <RemoveMemberButton
          workspaceId={workspaceId}
          workspaceSlug={workspaceSlug}
          member={member}
          role={member.role}
          profileId={member.id}
          onSuccess={onSuccess}
        />
      </div>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
