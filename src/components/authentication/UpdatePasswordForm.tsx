"use client";
import UpdatePasswordAction from "@/actions/authentication/UpdatePasswordAction";

import { useActionState } from "react";

export default function UpdatePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    UpdatePasswordAction,
    null,
  );

  return (
    <form action={formAction}>
      <div>
        <label>New Password</label>
        <input type="password" name="password" />
      </div>

      <button type="submit" disabled={isPending}>
        Submit
      </button>

      {state?.errors?.password && <p>{state.errors.password}</p>}
      {state?.error && <p>{state.error}</p>}
      {isPending && <p>Submiting...</p>}
    </form>
  );
}
