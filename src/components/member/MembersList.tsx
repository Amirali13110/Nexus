import { Profile } from "@/lib/types";
import Link from "next/link";

export default function MembersList({
  members,
  workspaceSlug,
}: {
  members: Profile[];
  workspaceSlug: string;
}) {
  return (
    <div>
      <ul>
        {members.map((member) => (
          <Link
            key={member.id}
            href={`/workspace/${workspaceSlug}/member/${member.id}`}
          >
            <li>{member.full_name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
