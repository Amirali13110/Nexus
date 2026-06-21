"use client";

import { updateMemberRoleAction } from "@/actions/member/UpdateMemberAction";
import Link from "next/link";
import { Member } from "@/lib/types";
import { useActionState, useState } from "react";
import UpdateMemberForm from "./UpdateMemberForm";
import Modal from "../ui/Modal";
import InviteMemberForm from "../invitation/InviteMemberForm";

export default function MemberList({
  members,
  workspaceId,
  workspaceSlug,
  currentUserRole,
  currentUserId,
}: {
  members: Member[];
  workspaceId: string;
  workspaceSlug: string;
  currentUserRole: string;
  currentUserId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    updateMemberRoleAction,
    null,
  );
  const canManage = currentUserRole === "admin" || currentUserRole === "owner";
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [isInvitingMember, setIsInvitingMember] = useState(false);

  if (isPending) {
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-24 flex flex-col items-center justify-center gap-3 dark:border-zinc-800/80 dark:bg-[#0c0c0e] font-sans antialiased">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-blue-600 dark:border-zinc-800 dark:border-t-blue-500" />
        <p className="text-xs font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
          Updating roster...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 select-none mt-5 ">
      <div className="flex items-end justify-between px-1 pb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Operators
          </h2>
          <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 mt-0.5">
            {members.length} Active Personnel
          </p>
        </div>

        {canManage && (
          <button
            onClick={() => setIsInvitingMember(true)}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-sm hover:bg-blue-500 transition-all active:scale-95 duration-100"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Invite Member
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        {members.map((member) => {
          const initial = member.username?.charAt(0).toUpperCase() || "M";
          const profileUrl = `/workspace/${workspaceSlug}/members/${member.id}`;
          const isSelf = member.id === currentUserId;
          const isOwner = member.role === currentUserRole;
          const isProtectedOwner = isSelf && isOwner;
          return (
            <div
              key={member.id}
              className="flex items-center p-4 bg-white border border-zinc-200/80 rounded-xl shadow-sm hover:border-zinc-300 dark:bg-[#0c0c0e] dark:border-zinc-800/80 dark:hover:border-zinc-700/80 transition-all duration-150"
            >
              <div className="relative shrink-0">
                <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-100 text-blue-600 dark:bg-blue-950/30 dark:border-blue-900/40 dark:text-blue-400 flex items-center justify-center text-sm font-black shadow-inner">
                  {initial}
                </div>
              </div>

              <div className="ml-4 flex-grow min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={profileUrl}
                    className="text-sm font-bold text-zinc-900 dark:text-zinc-50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
                  >
                    {member.full_name}
                  </Link>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-black tracking-wider uppercase shrink-0 ${
                      member.role === "owner" || member.role === "admin"
                        ? "bg-blue-50 text-blue-600 border border-blue-100/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/30"
                        : "bg-zinc-100 text-zinc-600 border border-zinc-200/40 dark:bg-zinc-800/60 dark:text-zinc-400 dark:border-zinc-700/30"
                    }`}
                  >
                    {member.role}
                  </span>
                </div>

                <p className="text-xs font-medium font-mono text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
                  {member.email}
                </p>
              </div>

              {canManage && !isProtectedOwner && (
                <div className="ml-4 flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsEditingRole(true)}
                    className="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    aria-label="Edit issue"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
              )}

              {isEditingRole && (
                <Modal
                  title="Edit member role"
                  isOpen={isEditingRole}
                  onClose={() => setIsEditingRole(false)}
                >
                  <UpdateMemberForm
                    workspaceId={workspaceId}
                    member={member}
                    onSuccess={() => setIsEditingRole(false)}
                    currentUserId={currentUserId}
                    workspaceSlug={workspaceSlug}
                  />
                </Modal>
              )}
              {isInvitingMember && (
                <Modal
                  title="Invite Member"
                  isOpen={isInvitingMember}
                  onClose={() => setIsInvitingMember(false)}
                >
                  <InviteMemberForm
                    onSuccess={() => setIsInvitingMember(false)}
                    workspaceId={workspaceId}
                  />
                </Modal>
              )}
            </div>
          );
        })}
      </div>

      {state?.error && (
        <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 text-xs font-bold font-mono text-red-600 dark:border-red-900/30 dark:bg-red-950/10 dark:text-red-400 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          Error Context: {state.error}
        </div>
      )}
    </div>
  );
}
