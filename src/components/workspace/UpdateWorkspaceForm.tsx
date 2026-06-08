"use client";
import { useActionState, useEffect } from "react";
import { updateWorkspaceAction } from "@/actions/workspace/UpdateWorkspaceAction";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { Workspace } from "@/lib/types";

export default function UpdateWorkspaceForm({
  workspace,
}: {
  workspace: Workspace;
}) {
  const { setCurrentWorkspace } = useWorkspaceStore();
  const [state, formAction, isPending] = useActionState(
    updateWorkspaceAction,
    null,
  );

  useEffect(() => {
    if (state?.success && state.workspace) {
      setCurrentWorkspace(state.workspace);
    }
  }, [state, setCurrentWorkspace]);

  return (
    <form action={formAction}>
      <input type="hidden" name="workspaceId" value={workspace.id} />
      <div>
        <label htmlFor="name">Workspace name</label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={workspace.name}
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
          defaultValue={workspace.description || ""}
          disabled={isPending}
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </button>
      {state?.error && <p>{state.error}</p>}
      {state?.success && <p>Workspace updated!</p>}
    </form>
  );
}
