import CreateProjectButton from "../project/CreateProjectButton";
import { Workspace } from "@/lib/types";
import ProjectList from "../project/ProjectList";
import InviteMemberForm from "../invitation/InviteMemberForm";

export default function WorkspaceView({ workspace }: { workspace: Workspace }) {
  return (
    <div>
      <h1>{workspace.name}</h1>
      <ProjectList workspaceId={workspace.id} workspaceSlug={workspace.slug} />
      <InviteMemberForm workspaceId={workspace.id} />
      <CreateProjectButton workspaceId={workspace.id} />
    </div>
  );
}
