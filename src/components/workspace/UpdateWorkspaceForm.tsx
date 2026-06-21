"use client";
import { useActionState, useEffect } from "react";
import { updateWorkspaceAction } from "@/actions/workspace/UpdateWorkspaceAction";
import { useWorkspaceStore } from "@/store/workspaceStore";
import type { Workspace } from "@/lib/types";

interface UpdateWorkspaceFormProps {
  onSuccess: () => void;
  workspace: Workspace;
}

export default function UpdateWorkspaceForm({
  onSuccess,
  workspace,
}: UpdateWorkspaceFormProps) {
  const { setCurrentWorkspace } = useWorkspaceStore();
  const [state, formAction, isPending] = useActionState(
    updateWorkspaceAction,
    null,
  );

  useEffect(() => {
    if (state?.success && state.data) {
      setCurrentWorkspace(state.data);
      onSuccess();
    }
  }, [state, setCurrentWorkspace, onSuccess]);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="workspaceId" value={workspace.id} />

      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Workspace name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={workspace.name}
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
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={workspace.description || ""}
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
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
