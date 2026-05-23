"use client";

interface Workspace {
  id: string;
  name: string;
  slug: string;
}

export default function WorkspaceView({ workspace }: { workspace: Workspace }) {
  return (
    <div>
      <h1>{workspace.name}</h1>
    </div>
  );
}
