"use client";
import type { Issue, Member } from "@/lib/types";
import IssueTableRow from "./IssueTableRow";

interface IssueTableProps {
  issues: Issue[];
  members: Member[];
  workspaceSlug: string;
  projectSlug: string;
  onEdit: (issue: Issue) => void;
  onDelete: (issueId: string) => void;
  refresh: () => void;
}

export default function IssueTable({
  issues,
  members,
  workspaceSlug,
  projectSlug,
  onEdit,
  onDelete,
  refresh,
}: IssueTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead>
          <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Assignee</th>
            <th className="px-4 py-3 font-medium">Due date</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {issues.map((issue) => (
            <IssueTableRow
              key={issue.id}
              issue={issue}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}