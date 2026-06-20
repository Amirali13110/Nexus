"use client";
import type { Issue } from "@/lib/types";
import Link from "next/link";
const priorityConfig: Record<
  number,
  { label: string; color: string; icon: string }
> = {
  0: {
    label: "No priority",
    color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    icon: "○",
  },
  1: {
    label: "Urgent",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: "⚠️",
  },
  2: {
    label: "High",
    color:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    icon: "↑",
  },
  3: {
    label: "Normal",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "·",
  },
  4: {
    label: "Low",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icon: "↓",
  },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  backlog: {
    label: "Backlog",
    color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
  todo: {
    label: "Todo",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  in_progress: {
    label: "In Progress",
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  in_review: {
    label: "In Review",
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  done: {
    label: "Done",
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
};

interface IssueTableRowProps {
  issue: Issue;
}

export default function IssueListTableRow({ issue }: IssueTableRowProps) {
  const priority = priorityConfig[issue.priority] ?? priorityConfig[0];
  const status = statusConfig[issue.status] ?? statusConfig.backlog;
  const assigneeInitial = issue.assignee?.username?.[0]?.toUpperCase() || "?";

  return (
    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
        <Link
          href={`/issue/${issue.id}`}
          className="font-medium text-gray-900 hover:text-[#0066ff] dark:text-white dark:hover:text-[#0066ff]"
        >
          {issue.title}
        </Link>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}
        >
          {status.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${priority.color}`}
        >
          <span>{priority.icon}</span>
          {priority.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            {assigneeInitial}
          </div>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            {issue.assignee?.username || "Unassigned"}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
        {issue.due_date ? new Date(issue.due_date).toLocaleDateString() : "—"}
      </td>
    </tr>
  );
}
