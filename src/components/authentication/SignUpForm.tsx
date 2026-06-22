"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { signUpAction } from "@/actions/authentication/SignUpAction";

import FormCard from "../Form/FormCard";
import useRedirectAction from "@/hooks/useRedirectAction";
import Spinner from "../ui/Spinner";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useRedirectAction(state);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordError(password !== value ? "Passwords do not match" : "");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword) {
      setPasswordError(
        value !== confirmPassword ? "Passwords do not match" : "",
      );
    }
  };

  return (
    <div className="relative flex h-screen flex-grow items-center justify-center overflow-hidden bg-gray-50 dark:bg-black">
      {/* Background decoration */}
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
          title="Create Account"
          subtitle="Start managing your projects"
        >
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-[#c2c6d8]">
                  Full Name (Optional)
                </label>
                <input
                  name="fullname"
                  type="text"
                  placeholder="John Doe"
                  disabled={isPending}
                  className="w-full rounded-xl border border-gray-300 dark:border-[#424656] bg-gray-50 dark:bg-[#2a2a2a] px-4 py-2 text-sm text-gray-900 dark:text-[#e5e2e1] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0066ff] focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-[#c2c6d8]">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="jdoe_admin"
                  required
                  disabled={isPending}
                  className="w-full rounded-xl border border-gray-300 dark:border-[#424656] bg-gray-50 dark:bg-[#2a2a2a] px-4 py-2 text-sm text-gray-900 dark:text-[#e5e2e1] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0066ff] focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-[#c2c6d8]">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="operator@nexus.systems"
                required
                disabled={isPending}
                className="w-full rounded-xl border border-gray-300 dark:border-[#424656] bg-gray-50 dark:bg-[#2a2a2a] px-4 py-2 text-sm text-gray-900 dark:text-[#e5e2e1] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0066ff] focus:outline-none focus:ring-0"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative">
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-[#c2c6d8]">
                  Password
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  disabled={isPending}
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full rounded-xl border border-gray-300 dark:border-[#424656] bg-gray-50 dark:bg-[#2a2a2a] px-4 py-2 text-sm text-gray-900 dark:text-[#e5e2e1] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0066ff] focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 4.375C5.625 4.375 2.5 7.5 1.25 10C2.5 12.5 5.625 15.625 10 15.625C14.375 15.625 17.5 12.5 18.75 10C17.5 7.5 14.375 4.375 10 4.375Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 16.875L2.5 1.875M18.75 10C17.5 7.5 14.375 4.375 10 4.375C8.4375 4.375 6.875 4.6875 5.625 5.3125M14.375 12.1875C13.75 13.125 11.875 15.625 10 15.625C5.625 15.625 2.5 12.5 1.25 10C1.875 8.125 3.125 6.25 5 4.375M1.25 1.25L3.125 3.125M16.875 1.875L14.375 4.375"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <div className="relative">
                <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-[#c2c6d8]">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  disabled={isPending}
                  value={confirmPassword}
                  onChange={handleConfirmChange}
                  className="w-full rounded-xl border border-gray-300 dark:border-[#424656] bg-gray-50 dark:bg-[#2a2a2a] px-4 py-2 text-sm text-gray-900 dark:text-[#e5e2e1] placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-[#0066ff] focus:outline-none focus:ring-0"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 4.375C5.625 4.375 2.5 7.5 1.25 10C2.5 12.5 5.625 15.625 10 15.625C14.375 15.625 17.5 12.5 18.75 10C17.5 7.5 14.375 4.375 10 4.375Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 13.125C11.7259 13.125 13.125 11.7259 13.125 10C13.125 8.27411 11.7259 6.875 10 6.875C8.27411 6.875 6.875 8.27411 6.875 10C6.875 11.7259 8.27411 13.125 10 13.125Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 16.875L2.5 1.875M18.75 10C17.5 7.5 14.375 4.375 10 4.375C8.4375 4.375 6.875 4.6875 5.625 5.3125M14.375 12.1875C13.75 13.125 11.875 15.625 10 15.625C5.625 15.625 2.5 12.5 1.25 10C1.875 8.125 3.125 6.25 5 4.375M1.25 1.25L3.125 3.125M16.875 1.875L14.375 4.375"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0066ff] py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
              disabled={!!passwordError}
            >
              {isPending ? <Spinner size="sm" color="white"/> : "Create Account"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-200 dark:border-[#424656] pt-4 text-center">
            <p className="text-sm text-gray-500 dark:text-[#c2c6d8]">
              Already have an account?{" "}
              <Link
                href="/signIn"
                className="font-bold text-[#0066ff] hover:underline"
              >
                Log in.
              </Link>
            </p>
          </div>
        </FormCard>
      </div>
    </div>
  );
}
