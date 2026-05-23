"use client";

import { createWorkspaceAction } from "@/actions/workspace/CreateWorkspaceAction";
import useRedirectAction from "@/hooks/useRedirectAction";
import { useActionState } from "react";

export default function CreateWorkspaceForm() {
  const [state, formAction, isPending] = useActionState(
    createWorkspaceAction,
    null,
  );

  useRedirectAction(state);

  return (
    <form action={formAction}>
      <label id="name">What is your workspace name</label>
      <input id="name" name="workspace-name" type="text" />
      <button disabled={isPending}>Create workspace</button>
      {state?.error && <p>{state.error}</p>}
      {isPending && <p>Creating...</p>}
    </form>
  );
}
