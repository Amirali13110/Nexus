"use client";
import { useActionState, useEffect } from "react";
import { createProjectAction } from "@/actions/project/CreateProjectAction";
import useRedirectAction from "@/hooks/useRedirectAction";

interface CreateProjectFormProps {
  onSuccess: () => void;
  workspaceId: string;
}

export default function CreateProjectForm({
  onSuccess,
  workspaceId,
}: CreateProjectFormProps) {
  const [state, formAction, isPending] = useActionState(
    createProjectAction,
    null,
  );

  useRedirectAction(state);

  useEffect(() => {
    if (state?.success) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="workspaceId" value={workspaceId} />

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
          placeholder="e.g., Website Redesign"
          required
          disabled={isPending}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          placeholder="What's this project about?"
          disabled={isPending}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>

      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-[#0066ff] py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
      >
        {isPending ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}
