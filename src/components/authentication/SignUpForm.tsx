"use client";

import { useAuthStore } from "@/store/authStore";
import { signUpAction } from "../../actions/authentication/SignUpAction";
import { useActionState } from "react";
import useRedirectAction from "@/hooks/useRedirectAction";

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUpAction, null);
  useRedirectAction(state);
  const { isLoading } = useAuthStore();
  return (
    <form action={formAction}>
      <div>
        <label>Full name</label>
        <input name="fullname" />
      </div>
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
      {isLoading && <p>Signing Up...</p>}
    </form>
  );
}
