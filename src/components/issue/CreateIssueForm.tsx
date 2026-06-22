"use client";
import { useActionState, useEffect } from "react";
import { createIssueAction } from "@/actions/issue/CreateIssueAction";
import type { Member } from "@/lib/types";
import { useProjectStore } from "@/store/projectStore";
import { useWorkspaceStore } from "@/store/workspaceStore";
import Spinner from "../ui/Spinner";

export default function CreateIssueForm({
  onSuccess,
  projectId,
  workspaceId,
  members,
}: {
  onSuccess: () => void;
  projectId: string;
  workspaceId: string;
  members: Member[];
}) {
  const currentProject = useProjectStore((state) => state.currentProject);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const [state, formAction, isPending] = useActionState(
    createIssueAction,
    null,
  );

  useEffect(
    function () {
      if (state?.success && state.data) {
        onSuccess();
      }
    },
    [state, onSuccess],
  );

  if (!currentWorkspace || !currentProject) {
    return (
      <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
        Loading workspace/project...
      </p>
    );
  }

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="workspaceId" value={workspaceId} />
      <input type="hidden" name="projectSlug" value={currentProject.slug} />
      <input type="hidden" name="workspaceSlug" value={currentWorkspace.slug} />

      <div className="space-y-1.5">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          disabled={isPending}
          placeholder="Issue title"
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          disabled={isPending}
          placeholder="Add optional description..."
          className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue="backlog"
            disabled={isPending}
            className="w-full rounded-xl cursor-pointer border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="backlog">Backlog</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="in_review">In Review</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            defaultValue="0"
            disabled={isPending}
            className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="0">No priority</option>
            <option value="1">Urgent</option>
            <option value="2">High</option>
            <option value="3">Normal</option>
            <option value="4">Low</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="assigneeId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Assignee
          </label>
          <select
            id="assigneeId"
            name="assigneeId"
            defaultValue=""
            disabled={isPending}
            className="w-full  cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="">Unassigned</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>
                {member.username} ({member.email})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Due date (optional)
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            disabled={isPending}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {state && !state.success && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer rounded-xl bg-[#0066ff] py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
      >
        {isPending ? <Spinner size="sm" color="white" /> : "Create Issue"}
      </button>
    </form>
  );
}
