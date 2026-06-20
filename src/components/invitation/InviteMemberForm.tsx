"use client";

import { useActionState, useEffect } from "react";
import { inviteWorkspaceMemberAction } from "@/actions/invitation/InviteWorkspaceMemberAction";

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

  useEffect(
    function () {
      if (state?.success) {
        onSuccess();
      }
    },
    [state, onSuccess],
  );

  return (
    <form action={formAction} className="w-full space-y-4">
      <input type="hidden" name="workspaceId" value={workspaceId} />

      <div className="space-y-1.5">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Invite Member{" "}
        </label>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="user@example.com"
            required
            disabled={isPending}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          />

          <select
            name="role"
            defaultValue="member"
            disabled={isPending}
            className=" cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {state?.error && (
        <div className="flex items-start gap-2.5 mt-2 rounded-lg border border-red-200 bg-red-50/50 p-3 text-xs font-medium text-red-600 dark:border-red-900/30 dark:bg-red-950/10 dark:text-red-400">
          <svg
            className="h-4 w-4 mt-0.5 shrink-0 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{state.error}</span>
        </div>
      )}

      {state?.success && (
        <div className="flex items-start gap-2.5 mt-2 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs font-medium text-emerald-600 dark:border-emerald-900/30 dark:bg-emerald-950/10 dark:text-emerald-400">
          <svg
            className="h-4 w-4 mt-0.5 shrink-0 text-emerald-500 dark:text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{state.message}</span>
        </div>
      )}

      <div className="pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center rounded-lg bg-[#0066ff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0052cc] active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Inviting...
            </span>
          ) : (
            "Invite Member"
          )}
        </button>
      </div>
    </form>
  );
}
