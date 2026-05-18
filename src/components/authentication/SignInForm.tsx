"use client";

import { signInAction } from "../../actions/authentication/SignInAction";
import { useActionState } from "react";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAction, null);

  return (
    <form action={formAction}>
      <div>
        <label>Email</label>
        <input name="identifier" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" />
      </div>

      <button type="submit" disabled={isPending}>
        Sign In
      </button>
      {state?.errors?.identifier && <p>{state.errors.identifier}</p>}
      {state?.errors?.password && <p>{state.errors.password}</p>}
      {state?.error && <p>{state.error}</p>}
      {isPending && <p>Signing In...</p>}
    </form>
  );
}
