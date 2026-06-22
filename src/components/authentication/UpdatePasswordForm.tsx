"use client";
import { useActionState, useState } from "react";
import useRedirectAction from "@/hooks/useRedirectAction";
import FormCard from "../Form/FormCard";
import updatePasswordAction from "@/actions/authentication/UpdatePasswordAction";
import Spinner from "../ui/Spinner";

export default function UpdatePasswordForm() {
  const [state, formAction, isPending] = useActionState(
    updatePasswordAction,
    null,
  );
  useRedirectAction(state);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else if (confirmPassword && value === confirmPassword) {
      setPasswordError("");
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordError(password !== value ? "Passwords do not match" : "");
  };

  return (
    <div className="relative flex h-screen flex-grow items-center justify-center overflow-hidden bg-gray-50 dark:bg-black">
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

      <div className="z-10 w-full max-w-xl px-4 py-6 md:py-12 md:px-0">
        <FormCard
          title="Set new password"
          subtitle="Enter your new password below."
        >
          <form action={formAction} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-[#c2c6d8]">
                New password
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                Confirm new password
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
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

            {passwordError && (
              <p className="text-sm text-red-500">{passwordError}</p>
            )}
            {state?.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
            {state?.success && (
              <p className="text-sm text-green-600 dark:text-green-400">
                Password updated! Redirecting...
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#0066ff] py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
              disabled={!!passwordError}
            >
              {isPending ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Password"
              )}
            </button>
          </form>
        </FormCard>
      </div>
    </div>
  );
}
