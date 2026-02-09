"use client"

import { signUpAction } from "@/app/actions/authentication/SignUpAction";
import { useActionState } from "react";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);

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
        Sign Up
      </button>
    </form>
  );
}
