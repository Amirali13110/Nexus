"use client";
import { useActionState } from "react";
import { createIssueAction } from "@/actions/issue/CreateIssueAction";
import type { ApiResult, Issue } from "@/lib/types";
import { useProjectStore } from "@/store/projectStore";
import { useWorkspaceStore } from "@/store/workspaceStore";

type CreateIssueActionType = (
  prevState: ApiResult<Issue> | null,
  formData: FormData,
) => Promise<ApiResult<Issue>>;

export default function CreateIssueForm({
  projectId,
  workspaceId,
}: {
  projectId: string;
  workspaceId: string;
}) {
  const currentProject = useProjectStore((state) => state.currentProject);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const [state, formAction, isPending] = useActionState(
    createIssueAction,
    null,
  );

  if (!currentWorkspace || !currentProject) {
    return <p>Loading workspace/project...</p>;
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="workspaceId" value={workspaceId} />
      <input type="hidden" name="projectSlug" value={currentProject.slug} />
      <input type="hidden" name="workspaceSlug" value={currentWorkspace.slug} />
      <div>
        <label htmlFor="title">Title *</label>
        <input id="title" name="title" required disabled={isPending} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          defaultValue="backlog"
          disabled={isPending}
        >
          <option value="backlog">Backlog</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="in_review">In Review</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          defaultValue="0"
          disabled={isPending}
        >
          <option value="0">No priority</option>
          <option value="1">Urgent</option>
          <option value="2">High</option>
          <option value="3">Normal</option>
          <option value="4">Low</option>
        </select>
      </div>
      <div>
        <label htmlFor="assigneeUsername">Assignee (optional, username)</label>
        <input
          id="assigneeUsername"
          name="assigneeUsername"
          placeholder="Username"
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="dueDate">Due date (optional)</label>
        <input id="dueDate" name="dueDate" type="date" disabled={isPending} />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Issue"}
      </button>
      {state && !state.success && <p>{state.error}</p>}
    </form>
  );
}
