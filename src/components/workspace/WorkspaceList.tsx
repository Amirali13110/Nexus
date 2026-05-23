"use client";
import { useWorkspaceStore } from "@/store/workspaceStore";
import Link from "next/link";

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
            <Link key={workspaces.id} href={`/workspace/${workspaces.slug}`}>
              <li>
                <h1>{workspaces.name}</h1>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
