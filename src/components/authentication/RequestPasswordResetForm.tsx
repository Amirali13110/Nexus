"use client";
import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordResetAction } from "@/actions/authentication/RequestPasswordResetAction";
import FormCard from "../Form/FormCard";
import Spinner from "../ui/Spinner";

export default function RequestPasswordResetForm() {
  const [state, formAction, isPending] = useActionState(
    requestPasswordResetAction,
    null,
  );

  return (
    <div className="relative flex min-h-screen flex-grow items-center justify-center overflow-hidden bg-gray-50 dark:bg-black">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-10">
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #353535 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
        <div className="absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-[#0066ff] opacity-20 blur-[120px]"></div>
        <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-[#0066ff] opacity-20 blur-[120px]"></div>
      </div>

      <div className="z-10 w-full max-w-xl px-4 py-12 md:px-0">
        <FormCard
          title="Reset password"
          subtitle="Enter your email address and we'll send you a link to reset your password."
        >
          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-[#c2c6d8]">
                Email address
              </label>
              <input
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                disabled={isPending}
                className="w-full rounded-xl border border-gray-300 dark:border-[#424656] bg-gray-50 dark:bg-[#2a2a2a] px-4 py-2 text-sm text-gray-900 dark:text-[#e5e2e1] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0066ff] focus:outline-none focus:ring-0"
              />
            </div>

            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
            {state?.success && (
              <p className="text-sm text-green-600 dark:text-green-400">
                If an account exists with that email, we've sent a password
                reset link.
              </p>
            )}

            <button
              className="w-full rounded-xl bg-[#0066ff] py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
              type="submit"
            >
              {isPending ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-200 dark:border-[#424656] pt-4 text-center">
            <p className="text-sm text-gray-500 dark:text-[#c2c6d8]">
              Remember your password?{" "}
              <Link
                href="/signIn"
                className="font-bold text-[#0066ff] hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </FormCard>
      </div>
    </div>
  );
}
