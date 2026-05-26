"use client";
import { createProjectAction } from "@/actions/project/CreateProjectAction";
import useRedirectAction from "@/hooks/useRedirectAction";
import { useActionState } from "react";

export default function CreateProjectForm({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    createProjectAction,
    null,
  );

  useRedirectAction(state);

  return (
    <form action={formAction}>
      <input type="hidden" name="workspaceId" value={workspaceId} />
      <div>
        <label htmlFor="name">Project name</label>
        <input id="name" name="name" required disabled={isPending} />
      </div>
      <div>
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          disabled={isPending}
        />
      </div>
      <button type="submit" disabled={isPending}>
        Create Project
      </button>
      {isPending && <p>Creating...</p>}
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
