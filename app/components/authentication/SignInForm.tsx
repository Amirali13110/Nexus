"use client";

import { signInAction } from "@/app/actions/authentication/SignInAction";
import { useActionState } from "react";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAction, null);

  return (
    <form action={formAction}>
      <div>
        <label>Email</label>
        <input type="email" name="email" required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" required />
      </div>

      <button type="submit" disabled={isPending}>
        Sign In
      </button>
    </form>
  );
}
