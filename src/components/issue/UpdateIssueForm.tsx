"use client";
import { useActionState, useEffect } from "react";
import { updateIssueAction } from "@/actions/issue/UpdateIssueAction";
import { Issue, Member } from "@/lib/types";
import { useIssueStore } from "@/store/issueStore";

export default function UpdateIssueForm({
  onSuccess,
  issue,
  projectId,
  workspaceSlug,

  projectSlug,
  members,
}: {
  onSuccess: () => void;
  issue: Issue;
  projectId: string;

  workspaceSlug: string;
  projectSlug: string;
  members: Member[];
}) {
  const [state, formAction, isPending] = useActionState(
    updateIssueAction,
    null,
  );
  useEffect(
    function () {
      if (state?.success) {
        onSuccess();
      }
    },
    [state?.success],
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="issueId" value={issue.id} />
      <input type="hidden" name="projectId" value={projectId} />
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <input type="hidden" name="projectSlug" value={projectSlug} />

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={issue.title}
          required
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={issue.description || ""}
          disabled={isPending}
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          defaultValue={issue.status}
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
          defaultValue={issue.priority}
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
        <label htmlFor="assigneeId">Assignee</label>
        <select
          id="assigneeId"
          name="assigneeId"
          defaultValue={issue.assignee_id || ""}
          disabled={isPending}
        >
          <option value="">Unassigned</option>
          {members.map((member) => (
            <option key={member.id} value={member.id}>
              {member.username} ({member.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="dueDate">Due date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          defaultValue={issue.due_date || ""}
          disabled={isPending}
        />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </button>

      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
