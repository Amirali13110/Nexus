import CreateProjectButton from "../project/CreateProjectButton";
import { Workspace } from "@/lib/types";
import ProjectList from "../project/ProjectList";
import InviteMemberForm from "../invitation/InviteMemberForm";
import Link from "next/link";

export default function WorkspaceView({
  workspace,
  role,
}: {
  workspace: Workspace;
  role: string;
}) {
  const isAdmin = role === "owner" || role === "admin";
  return (
    <div>
      <h1>{workspace.name}</h1>
      <ProjectList workspaceId={workspace.id} workspaceSlug={workspace.slug} />
      <Link href={`/workspace/${workspace.slug}/members`}>Members</Link>
      {isAdmin && (
        <div>
          <InviteMemberForm workspaceId={workspace.id} />
          <CreateProjectButton workspaceId={workspace.id} />
        </div>
      )}
    </div>
  );
}
