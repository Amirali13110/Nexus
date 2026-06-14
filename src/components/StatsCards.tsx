"use client";

import { useIssueStore } from "@/store/issueStore";
import { useProjectStore } from "@/store/projectStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function StatsCards() {
  const { workspaces } = useWorkspaceStore();
  const { projects } = useProjectStore();
  const { issues } = useIssueStore();
  const totalWorkspaces = workspaces.length;
  const totalProjects = projects.length;
  const totalIssues = issues.length;
  const openIssues = issues.filter((issue) => issue.status !== "done").length;

  return (
    <div className="m-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Workspaces" value={totalWorkspaces} icon="🏢" />
      <StatCard title="Projects" value={totalProjects} icon="📁" />
      <StatCard title="Total Issues" value={totalIssues} icon="📋" />
      <StatCard title="Open Issues" value={openIssues} icon="⚠️" />
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
}
