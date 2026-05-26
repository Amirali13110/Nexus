import CreateProjectButton from "../project/CreateProjectButton";
import { Workspace } from "@/lib/types";
import ProjectList from "../project/ProjectList";

export default function WorkspaceView({ workspace }: { workspace: Workspace }) {
  return (
    <div>
      <h1>{workspace.name}</h1>
      <ProjectList workspaceId={workspace.id} workspaceSlug={workspace.slug} />
      <CreateProjectButton workspaceId={workspace.id} />
    </div>
  );
}
