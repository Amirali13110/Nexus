"use client";

import { declineInvitationByIdAction } from "@/actions/invitation/DeclineInvitationByIdAction";
import { Invitation } from "@/lib/types";
import { acceptInvitationByIdAction } from "@/actions/invitation/AcceptInvitationByIdAction";

export default function InvitationList({
  invitations,
}: {
  invitations: Invitation[];
}) {
  if (!invitations.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#131313]/30">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          No pending operational invitations available.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 max-w-2xl mt-3 mx-auto">
      {invitations.map((inv) => {
        return (
          <li
            key={inv.id}
            className="bg-white dark:bg-[#131313] border border-zinc-200 dark:border-[#27272a] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700/60 shadow-sm"
          >
            <div className="flex items-center gap-4">
             

              <div className="space-y-1">
                <h3 className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {inv.workspace?.name || `Workspace ID: ${inv.workspace_id}`}
                </h3>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] font-mono uppercase tracking-wider border border-zinc-200/60 dark:border-zinc-700/40">
                    {inv.role}
                  </span>
                  <span className="text-zinc-300 dark:text-zinc-800">•</span>
                  <span>
                    Expires: {new Date(inv.expires_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {" "}
              <form action={declineInvitationByIdAction}>
                <input type="hidden" name="invitationId" value={inv.id} />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-lg text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-red-600 dark:hover:text-red-400 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Decline
                </button>
              </form>
              <form action={acceptInvitationByIdAction}>
                <input type="hidden" name="invitationId" value={inv.id} />
                <input
                  type="hidden"
                  name="workspaceId"
                  value={inv.workspace_id}
                />
                <input type="hidden" name="role" value={inv.role} />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 bg-[#0066ff] hover:bg-[#0055dd] text-white rounded-lg text-xs font-semibold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                >
                  Accept
                </button>
              </form>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
