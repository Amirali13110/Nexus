"use client";
import { updateMemberRoleAction } from "@/actions/member/UpdateMemberAction";
import Link from "next/link";
import { deleteMemberAction } from "@/actions/member/DeleteMemberAction";
import { Member } from "@/lib/types";
import { useActionState } from "react";
import DeleteMemberForm from "./DeleteMemberForm";
import UpdateMemberForm from "./UpdateMemberForm";
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
  const canManage = currentUserRole === "owner" || currentUserRole === "admin";
  const [state, formAction, isPending] = useActionState(
    updateMemberRoleAction,
    null,
  );

  if (!members.length) return <p>No members found.</p>;
  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <h3>Username</h3>
        <h3>Email</h3>
        <h3>Role</h3>
        <h3>Actions</h3>
      </div>
      <div>
        {members.map((member) => (
          <div key={member.id} className="">
            {member.id === currentUserId && member.role === "owner" ? (
              <Link href={`/workspace/${workspaceSlug}/members/${member.id}`}>
                <h4>{member.username}</h4>
                <h4>{member.email}</h4>
              </Link>
            ) : (
              <div>
                <Link href={`/workspace/${workspaceSlug}/members/${member.id}`}>
                  <h4>{member.username}</h4>
                  <h4>{member.email}</h4>
                </Link>
                <div>
                  {canManage ? (
                    member.id === currentUserId && member.role === "owner" ? (
                      <span>Owner</span>
                    ) : (
                      <UpdateMemberForm
                        member={member}
                        workspaceId={workspaceId}
                        workspaceSlug={workspaceSlug}
                        currentUserId={currentUserId}
                      />
                    )
                  ) : (
                    member.role
                  )}
                </div>
                <div>
                  {canManage && member.id !== currentUserId && (
                    <DeleteMemberForm
                      member={member}
                      workspaceId={workspaceId}
                      workspaceSlug={workspaceSlug}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {state?.error && <p>{state.error}</p>}
    </div>
  );
}
