"use client";
import { useAuthStore } from "@/store/authStore";
import { signInAction } from "../../actions/authentication/SignInAction";
import { useActionState } from "react";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAction, null);
  const { isLoading } = useAuthStore();
  return (
    <form action={formAction}>
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" />
      </div>

      <button type="submit" disabled={isPending}>
        Sign In
      </button>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      {state?.errors?.password && <p>{state.errors.password}</p>}
      {state?.error && <p>{state.error}</p>}
      {isLoading && <p>Signing In...</p>}
    </form>
  );
}
