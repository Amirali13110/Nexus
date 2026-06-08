"use client";

import { Member } from "@/lib/types";

export default function MemberProfileView({ member }: { member: Member }) {
  return (
    <div>
      <h1>{member?.full_name || member?.username}</h1>
      <p>Username: {member?.username}</p>
      <p>Email: {member?.email}</p>
      <p>Role: {member.role}</p>
      <p>Joined: {new Date(member?.joined_at).toLocaleDateString()}</p>
      {member?.bio && <p>Bio: {member?.bio}</p>}
      {member?.avatar_url && (
        <img src={member?.avatar_url} alt="Avatar" width="100" />
      )}
    </div>
  );
}
