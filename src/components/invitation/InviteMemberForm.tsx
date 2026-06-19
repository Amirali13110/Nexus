"use client";

import { inviteWorkspaceMemberAction } from "@/actions/invitation/InviteWorkspaceMemberAction";
import { useActionState } from "react";
export default function InviteMemberForm({
  onSuccess,
  workspaceId,
}: {
  onSuccess: () => void;
  workspaceId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    inviteWorkspaceMemberAction,
    null,
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="workspaceId" value={workspaceId} />

      <input
        type="email"
        name="email"
        placeholder="user@example.com"
        required
      />
      <select name="role" defaultValue="member">
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" disabled={isPending}>
        Invite
      </button>
      {state?.error && <p>{state.error}</p>}
      {state?.success && <p>{state.message}</p>}
    </form>
  );
}
