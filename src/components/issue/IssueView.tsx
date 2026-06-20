"use client";
import Modal from "../ui/Modal";

import type { Issue, Member, Project } from "@/lib/types";
import UpdateIssueForm from "./UpdateIssueForm";
import { useState } from "react";
import { deleteIssueAction } from "@/actions/issue/DeleteIssueAction";
import { redirect } from "next/navigation";

const statusStyles: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  backlog: {
    label: "Backlog",
    color: "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-zinc-300",
    dot: "bg-gray-400",
  },
  todo: {
    label: "Todo",
    color: "bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  in_progress: {
    label: "In Progress",
    color:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  in_review: {
    label: "In Review",
    color:
      "bg-purple-50 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400",
    dot: "bg-purple-500",
  },
  done: {
    label: "Done",
    color:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
};

const priorityStyles: Record<
  number,
  { label: string; color: string; icon: string }
> = {
  0: {
    label: "No priority",
    color: "text-gray-400 dark:text-zinc-500",
    icon: "···",
  },
  1: {
    label: "Urgent",
    color:
      "text-red-600 bg-red-50 dark:bg-red-950/20 dark:text-red-400 font-semibold",
    icon: "⚑",
  },
  2: {
    label: "High",
    color:
      "text-orange-600 bg-orange-50 dark:bg-orange-950/20 dark:text-orange-400",
    icon: "▲",
  },
  3: {
    label: "Normal",
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20 dark:text-blue-400",
    icon: "■",
  },
  4: {
    label: "Low",
    color: "text-gray-500 bg-gray-50 dark:bg-zinc-900 dark:text-zinc-400",
    icon: "▼",
  },
};

export default function IssueView({
  issue,
  members,
  workspaceSlug,
  project,
}: {
  issue: Issue;
  members: Member[];
  workspaceSlug: string;
  project: Project;
}) {
  const assigneeName =
    issue.assignee?.full_name || issue.assignee?.username || "Unassigned";

  const currentStatus = statusStyles[issue.status] || {
    label: issue.status,
    color: "bg-gray-100 text-gray-700",
    dot: "bg-gray-400",
  };
  const currentPriority = priorityStyles[issue.priority] || priorityStyles[0];
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-[#0066ff] uppercase tracking-wider">
              Issue Detail View
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight break-words">
              {issue.title}
            </h1>
          </div>

          <hr className="border-gray-100 dark:border-zinc-800" />

          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
              Description
            </h3>
            <div className="min-h-[150px] rounded-xl border border-gray-200/70 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[#131313]">
              {issue.description ? (
                <p className="text-sm text-gray-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed">
                  {issue.description}
                </p>
              ) : (
                <p className="text-sm text-gray-400 dark:text-zinc-600 italic">
                  No additional context or description provided for this issue.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 shrink-0 rounded-xl border border-gray-200/80 bg-gray-50/50 p-5 dark:border-gray-800 dark:bg-[#0c0c0c]">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-gray-200/60 dark:border-zinc-800/80">
            {" "}
            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 px-3 bg-[#0066ff] text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
            >
              {" "}
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />{" "}
              </svg>{" "}
              Edit Issue{" "}
            </button>{" "}
            <button
              onClick={() => setIsDeleting(true)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50/30 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 active:scale-[0.98] dark:border-red-950/20 dark:bg-red-950/10 dark:text-red-400 dark:hover:bg-red-950/20"
            >
              {" "}
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />{" "}
              </svg>{" "}
              Delete{" "}
            </button>{" "}
          </div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500 mb-4">
            Properties
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-zinc-900">
              <span className="text-gray-500 dark:text-zinc-400 font-medium">
                Status
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold ${currentStatus.color}`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${currentStatus.dot}`}
                />
                {currentStatus.label}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-zinc-900">
              <span className="text-gray-500 dark:text-zinc-400 font-medium">
                Priority
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${currentPriority.color && !currentPriority.color.includes(" ") ? "" : "px-2 py-1"}`}
              >
                <span className="font-mono">{currentPriority.icon}</span>
                <span>{currentPriority.label}</span>
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-zinc-900">
              <span className="text-gray-500 dark:text-zinc-400 font-medium">
                Assignee
              </span>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-[#0066ff] flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-sm">
                  {assigneeName.charAt(0)}
                </div>
                <span className="font-semibold text-gray-800 dark:text-zinc-200 text-xs">
                  {assigneeName}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-gray-100 dark:border-zinc-900">
              <span className="text-gray-500 dark:text-zinc-400 font-medium">
                Due date
              </span>
              {issue.due_date ? (
                <span className="text-xs font-semibold text-gray-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 px-2 py-1 rounded-md border border-gray-100 dark:border-zinc-800 flex items-center gap-1">
                  <svg
                    className="h-3 w-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(issue.due_date).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              ) : (
                <span className="text-xs text-gray-400 dark:text-zinc-600 italic">
                  Not set
                </span>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-zinc-800 space-y-1.5 text-[11px] text-gray-400 dark:text-zinc-500 font-medium">
            <div className="flex items-center justify-between">
              <span>Created</span>
              <span className="text-gray-600 dark:text-zinc-400">
                {new Date(issue.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last updated</span>
              <span className="text-gray-600 dark:text-zinc-400">
                {new Date(issue.updated_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={!!isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Issue"
      >
        {isEditing && (
          <UpdateIssueForm
            issue={issue}
            projectId={project.id}
            workspaceSlug={workspaceSlug}
            projectSlug={project.slug}
            members={members}
            onSuccess={() => {
              setIsEditing(false);
            }}
          />
        )}
      </Modal>
      {isDeleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Issue?
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsDeleting(false)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const result = await deleteIssueAction({
                    deletingIssueId: issue.id,
                    workspaceSlug,
                    projectSlug: project.slug,
                  });
                  result.success && redirect("/");
                  setIsDeleting(false);
                }}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
