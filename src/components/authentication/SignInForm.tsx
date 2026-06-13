"use client";

import { signInAction } from "../../actions/authentication/SignInAction";
import { Button } from "@/components/ui/button";

import { useActionState, useState } from "react";
import { useHashError } from "@/hooks/useHashError";
import useRedirectAction from "@/hooks/useRedirectAction";
import Link from "next/link";

export default function SignInForm() {
  const [state, formAction, isPending] = useActionState(signInAction, null);
  useRedirectAction(state);
  const [showPassword, setShowPassword] = useState(false);

  const error = useHashError();
  return <div className="flex min-h-screen flex-col lg:flex-row"></div>;
}
