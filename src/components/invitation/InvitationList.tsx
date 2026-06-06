"use client";
import { useActionState } from "react";
import { declineInvitationByIdAction } from "@/actions/invitation/DeclineInvitationByIdAction";
import { Invitation } from "@/lib/types";
import { acceptInvitationByIdAction } from "@/actions/invitation/AcceptInvitationByIdAction";
export default function InvitationList({
  invitations,
}: {
  invitations: Invitation[];
}) {
  if (!invitations.length) return <p>No pending invitations.</p>;

  return (
    <ul>
      {invitations.map((inv) => (
        <li key={inv.id}>
          <p>
            <strong>Workspace:</strong>{" "}
            {inv.workspace?.name || inv.workspace_id}
          </p>
          <p>
            <strong>Role:</strong> {inv.role}
          </p>
          <p>
            <strong>Expires:</strong>{" "}
            {new Date(inv.expires_at).toLocaleDateString()}
          </p>
          <form action={acceptInvitationByIdAction}>
            <input type="hidden" name="invitationId" value={inv.id} />
            <input type="hidden" name="workspaceId" value={inv.workspace_id} />
            <input type="hidden" name="role" value={inv.role} />
            <button type="submit">Accept</button>
          </form>
          <form action={declineInvitationByIdAction}>
            <input type="hidden" name="invitationId" value={inv.id} />
            <button type="submit">Decline</button>
          </form>
        </li>
      ))}
    </ul>
  );
}
