"use client";

import { useActionState, useEffect } from "react";
import { createWorkspaceAction } from "@/actions/workspace/CreateWorkspaceAction";
import useRedirectAction from "@/hooks/useRedirectAction";
import { useWorkspaceStore } from "@/store/workspaceStore";
import Spinner from "../ui/Spinner";

interface CreateWorkspaceFormProps {
  onSuccess?: () => void;
}

export default function CreateWorkspaceForm({
  onSuccess,
}: CreateWorkspaceFormProps) {
  const [state, formAction, isPending] = useActionState(
    createWorkspaceAction,
    null,
  );
  const { fetchWorkspaces } = useWorkspaceStore();

  useRedirectAction(state);

  useEffect(() => {
    if (state?.success) {
      fetchWorkspaces();
      onSuccess?.();
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-1.5">
        <label
          htmlFor="workspace-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Workspace name
        </label>
        <input
          id="workspace-name"
          name="workspace-name"
          type="text"
          placeholder="e.g., Acme Inc."
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
          rows={2}
          placeholder="What's this workspace for?"
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
        {isPending ? <Spinner size="sm" color="white" /> : "Create Workspace"}
      </button>
    </form>
  );
}
