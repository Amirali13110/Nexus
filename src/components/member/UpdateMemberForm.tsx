import { updateMemberRoleAction } from "@/actions/member/UpdateMemberAction";
import { Member } from "@/lib/types";
import { useActionState, useEffect } from "react";
import RemoveMemberButton from "./RemoveMemberButton";
import { useAuthStore } from "@/store/authStore";

export default function UpdateMemberForm({
  workspaceId,
  memberId,
  member,
  onSuccess,
}: {
  workspaceId: string;
  memberId: string;
  member: Member;
  onSuccess: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    updateMemberRoleAction,
    null,
  );

  useEffect(
    function () {
      if (state?.success) onSuccess();
    },
    [state?.success],
  );

  const { user } = useAuthStore();
  const isOwner = member.role === "owner";
  const isSelf = member.id === user?.id;
  const allRoles = ["member", "admin", "owner"];
  const otherRoles = allRoles.filter((role) => role !== member.role);
  console.log(state?.error);
  const allowedRoles = otherRoles.filter((role) => {
    if (role === "owner") return isOwner && isSelf;
    return true;
  });

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
      <form action={formAction} className="flex-1 space-y-3">
        <input type="hidden" name="workspaceId" value={workspaceId} />
        <input type="hidden" name="memberId" value={member.id} />

        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Member role
        </label>

        <select
          name="role"
          id="role"
          defaultValue=""
          onChange={(e) => e.target.form?.requestSubmit()}
          disabled={isPending}
          className="w-full rounded-xl cursor-pointer border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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

        {state?.error && (
          <p className="text-sm text-red-500">
            {typeof state.error === "string"
              ? state.error
              : JSON.stringify(state.error)}
          </p>
        )}
      </form>

      <div className="shrink-0">
        <RemoveMemberButton
          workspaceId={workspaceId}
          member={member}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
