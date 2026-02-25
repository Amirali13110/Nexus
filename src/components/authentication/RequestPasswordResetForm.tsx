"use client";

import { requestPasswordResetAction } from "@/actions/authentication/RequestPasswordResetAction";
import { useActionState } from "react";

export default function RequestPasswordResetForm() {
  const [state, formAction, isPending] = useActionState(
    requestPasswordResetAction,
    null,
  );

  return (
    <form action={formAction}>
      <label>Email</label>
      <input
        name="identifier"
        type="text"
        placeholder="Enter your Email or Username"
      />
      <button>{isPending ? "Sending..." : "Send reset link"}</button>

      <p>{state?.error}</p>
      {state?.success && <p>{state.message}</p>}
    </form>
  );
}
