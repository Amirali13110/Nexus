// components/workspace/DeleteWorkspaceButton.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteWorkspaceAction } from "@/actions/workspace/DeleteWorkspaceAction";
import { useWorkspaceStore } from "@/store/workspaceStore";
import Spinner from "../ui/Spinner";

interface DeleteWorkspaceButtonProps {
  onSuccess?: () => void;
  workspaceId: string;
}

export default function DeleteWorkspaceButton({
  onSuccess,
  workspaceId,
}: DeleteWorkspaceButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { fetchWorkspaces } = useWorkspaceStore();
  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await deleteWorkspaceAction(workspaceId);

      if (response?.error) {
        setError(response.error);
        setIsDeleting(false);
        return;
      }
      if (onSuccess) {
        fetchWorkspaces();
        onSuccess();
        setShowConfirm(false);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (isDeleting) return;
    setShowConfirm(false);
    setError(null);
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        disabled={isDeleting}
        className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
        {isDeleting ? "Deleting..." : "Delete Workspace"}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Workspace?
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone. All projects and issues will be
              permanently removed.
            </p>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50/50 p-3 dark:border-red-900/50 dark:bg-red-950/20">
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                  {error}
                </p>
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={isDeleting}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center justify-center rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
