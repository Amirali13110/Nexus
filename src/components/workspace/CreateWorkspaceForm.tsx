"use client";

import { createWorkspaceAction } from "@/actions/workspace/CreateWorkspaceAction";
import { useActionState } from "react";

export default function CreateWorkspaceForm() {
  const [state, formAction] = useActionState(createWorkspaceAction, null);
  console.log(state?.data);
  return (
    <form action={formAction}>
      <label id="name">What is your workspace name</label>
      <input id="name" name="workspace-name" type="text" />
      <button>Create workspace</button>
    </form>
  );
}
