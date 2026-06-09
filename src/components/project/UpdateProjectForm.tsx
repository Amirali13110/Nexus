"use client";
import { useActionState, useEffect } from "react";
import { updateProjectAction } from "@/actions/project/UpdateProjectAction";

export default function UpdateProjectForm({
  project,
  workspaceSlug,
}: {
  project: any;
  workspaceSlug: string;
}) {
  const [state, formAction, isPending] = useActionState(
    updateProjectAction,
    null,
  );

  useEffect(() => {
    if (
      state?.success &&
      state.project?.slug &&
      state.project.slug !== project.slug
    ) {
      window.location.href = `/workspace/${workspaceSlug}/project/${state.project.slug}/settings`;
    }
  }, [state, workspaceSlug, project.slug]);

  return (
    <form action={formAction}>
      <input type="hidden" name="projectId" value={project.id} />
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />
      <div>
        <label htmlFor="name">Project name</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={project.name}
          required
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={project.description || ""}
          disabled={isPending}
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </button>
      {state?.error && <p>{state.error}</p>}
      {state?.success && <p>Project updated!</p>}
    </form>
  );
}
