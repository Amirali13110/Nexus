"use client";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useProjectStore } from "@/store/projectStore";
import { useIssueStore } from "@/store/issueStore";
import { ReactNode } from "react";

export default function StatsCards() {
  const { workspaces } = useWorkspaceStore();
  const { projects } = useProjectStore();
  const { issues } = useIssueStore();

  const totalWorkspaces = workspaces.length;
  const totalProjects = projects.length;
  const totalIssues = issues.length;
  const openIssues = issues.filter((issue) => issue.status !== "done").length;

  const stats = [
    { title: "Workspaces", value: totalWorkspaces },
    { title: "Projects", value: totalProjects },
    { title: "Total Issues", value: totalIssues },
    { title: "Open Issues", value: openIssues },
  ];
  type IconsKey = "Workspaces" | "Projects" | "Total Issues" | "Open Issues";
  type IconsMap = Record<IconsKey, ReactNode>;

  const icons: IconsMap = {
    Workspaces: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 9L12 3L21 9L12 15L3 9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 12L5 18L12 22L19 18L19 12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15L12 21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    Projects: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 8H22"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 12H16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 16H14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    "Total Issues": (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 8H16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 12H14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 16H12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
    "Open Issues": (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 8V12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M12 16H12.01"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-md dark:border-gray-800 dark:bg-gray-950">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {stats.map((stat, idx) => {
          const isTopRow = idx < 2;
          const isLeftColumn = idx % 2 === 0;
          return (
            <div
              key={stat.title}
              className={`
                relative p-6 transition-all hover:bg-gray-50/50 dark:hover:bg-gray-900/30
                ${isTopRow ? "border-b border-gray-200 dark:border-gray-800" : ""}
                ${isLeftColumn ? "sm:border-r border-gray-200 dark:border-gray-800" : ""}
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className="text-gray-400 dark:text-gray-500">
                  {icons[stat.title as IconsKey]}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
