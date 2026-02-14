"use client";

import { useAuthStore } from "@/store/authStore";
import { signUpAction } from "../../actions/authentication/SignUpAction";
import { useActionState } from "react";

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUpAction, null);
  const { isLoading } = useAuthStore();
  return (
    <form action={formAction}>
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Username</label>
        <input name="username" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" />
      </div>

      <button type="submit" disabled={isLoading}>
        Sign Up
      </button>

      {state?.errors?.email && <p>{state.errors.email}</p>}
      {state?.errors?.password && <p>{state.errors.password}</p>}
      {state?.error && <p>{state.error}</p>}
    </form>
  );
}
