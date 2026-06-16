"use client";
import Link from "next/link";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function WorkspaceCards() {
  const { workspaces, isLoading } = useWorkspaceStore();

  if (isLoading) {
    return (
      <div className="grid m-3 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800"
          />
        ))}
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className="rounded-2xl m-3 border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          No workspaces yet. Create your first workspace to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 m3 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {workspaces.map((ws) => (
        <Link
          key={ws.id}
          href={`/workspace/${ws.slug}`}
          className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-[#0066ff]">
            {ws.name}
          </h3>
          {ws.description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {ws.description}
            </p>
          )}
          <div className="mt-3 text-sm font-medium text-[#0066ff] opacity-0 transition-opacity group-hover:opacity-100">
            View workspace →
          </div>
        </Link>
      ))}
    </div>
  );
}
