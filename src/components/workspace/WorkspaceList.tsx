"use client";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function WorkspaceList() {
  const { workspaces, error, isLoading } = useWorkspaceStore();
  console.log(isLoading);

  return (
    <div>
      Workspace list
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p className="text-red-500">{error}</p>}
      <ul>
        {!isLoading &&
          !error &&
          workspaces.map((workspaces) => (
            <li key={workspaces.id}>
              <h1>{workspaces.name}</h1>
            </li>
          ))}
      </ul>
    </div>
  );
}
