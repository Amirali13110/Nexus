"use client";
import { useActionState, useEffect } from "react";
import { updateProjectAction } from "@/actions/project/UpdateProjectAction";
import Spinner from "../ui/Spinner";
import { Project } from "@/lib/types";

export default function UpdateProjectForm({
  onSuccess,
  project,
  workspaceSlug,
}: {
  project: Project;
  workspaceSlug: string;
  onSuccess: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    updateProjectAction,
    null,
  );
  const stateProject = state?.data;

  useEffect(() => {
    if (
      state?.success &&
      stateProject?.slug &&
      stateProject.slug !== project.slug
    ) {
      onSuccess();
    }
  }, [state, workspaceSlug, project.slug]);

  return (
    <form action={formAction} className="space-y-6 max-w-xl">
      <input type="hidden" name="projectId" value={project.id} />
      <input type="hidden" name="workspaceSlug" value={workspaceSlug} />

      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Project name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={project.name}
          required
          disabled={isPending}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
        {state?.fieldErrors?.name && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {state.fieldErrors.name[0]}
          </p>
        )}
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
          defaultValue={project.description || ""}
          disabled={isPending}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 resize-none"
        />
        {state?.fieldErrors?.description && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {state.fieldErrors.description[0]}
          </p>
        )}
      </div>

      {state?.error && (
           <div className="flex items-start gap-2.5 mt-2 rounded-lg border border-red-200 bg-red-50/50 p-3 text-xs font-medium text-red-600 dark:border-red-900/30 dark:bg-red-950/10 dark:text-red-400">
          <svg
            className="h-4 w-4 mt-0.5 shrink-0 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>{state.error}</span>
        </div>
      )}

      {state?.success && (
        <p className="text-sm font-medium text-green-500 dark:text-green-400">
          Project updated successfully!
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center rounded-xl bg-[#0066ff] py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
      >
        {isPending ? <Spinner size="sm" color="white" /> : "Save Changes"}
      </button>
    </form>
  );
}
