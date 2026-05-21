"use client";

import { createWorkspaceAction } from "@/actions/workspace/CreateWorkspaceAction";
import { useActionState } from "react";

export default function CreateWorkspaceForm() {
  const [state, formAction, isPending] = useActionState(
    createWorkspaceAction,
    null,
  );

  return (
    <form action={formAction}>
      <label id="name">What is your workspace name</label>
      <input id="name" name="workspace-name" type="text" />
      <button disabled={isPending}>Create workspace</button>
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
