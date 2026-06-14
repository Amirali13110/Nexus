"use client";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WorkspaceSwitcher() {
  const { workspaces, currentWorkspace, setCurrentWorkspace } =
    useWorkspaceStore();
  const router = useRouter();

  useEffect(() => {
    if (workspaces.length > 0 && !currentWorkspace) {
      setCurrentWorkspace(workspaces[0]);
    }
  }, [workspaces, currentWorkspace, setCurrentWorkspace]);

  if (workspaces.length === 0) {
    return (
      <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
    );
  }
  if (!currentWorkspace) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const workspace = workspaces.find((ws) => ws.id === selectedId);
    if (workspace) {
      setCurrentWorkspace(workspace);
      router.push(`/workspace/${workspace.slug}`);
    }
  };

  return (
    <select
      value={currentWorkspace.id}
      onChange={handleChange}
      className="cursor-pointer rounded-md border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm transition-all hover:border-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 sm:px-3 sm:py-1.5 sm:text-sm"
    >
      {workspaces.map((ws) => (
        <option key={ws.id} value={ws.id} className="cursor-pointer">
          {ws.name}
        </option>
      ))}
    </select>
  );
}
