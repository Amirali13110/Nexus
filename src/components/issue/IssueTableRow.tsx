"use client";
import type { Issue } from "@/lib/types";

// Priority config (same as before)
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

// Status config
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
  onEdit: (issue: Issue) => void;
  onDelete: (issueId: string) => void;
}

export default function IssueTableRow({
  issue,
  onEdit,
  onDelete,
}: IssueTableRowProps) {
  const priority = priorityConfig[issue.priority] ?? priorityConfig[0];
  const status = statusConfig[issue.status] ?? statusConfig.backlog;
  const assigneeInitial = issue.assignee?.username?.[0]?.toUpperCase() || "?";

  return (
    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
        {issue.title}
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
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(issue)}
            className="rounded p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            aria-label="Edit issue"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(issue.id)}
            className="rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400"
            aria-label="Delete issue"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
