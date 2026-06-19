"use client";
import { useState } from "react";
import signOutAction from "@/actions/authentication/SignOutAction";

interface SignOutButtonProps {
  profileToken: string;
}

export default function SignOutButton({ profileToken }: SignOutButtonProps) {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const result = await signOutAction(profileToken);
      if (result?.success) {
      } else {
        return <p>Failed to sign out: {result?.error}</p>;
      }
    } catch (error) {
      console.error("Failed to delete workspace:", error);
    } finally {
      setIsSigningOut(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isSigningOut}
        className="w-full h-14 bg-white dark:bg-transparent text-[#ba1a1a] dark:text-[#ef4444] border border-[#ba1a1a]/20 dark:border-[#ef4444]/30 rounded-xl text-lg font-medium flex items-center justify-center gap-2 hover:bg-[#ba1a1a]/5 dark:hover:bg-[#ef4444]/10 active:scale-[0.98] transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
        {isSigningOut ? "Signing out..." : "Sign out"}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Do you want to sign out?
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone. All projects and issues will be
              permanently removed.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
              >
                Yes, Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
