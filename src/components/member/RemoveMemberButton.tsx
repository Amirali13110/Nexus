import { removeMemberAction } from "@/actions/member/RemoveMemberAction";
import { Member } from "@/lib/types";
import { useActionState, useState } from "react";
import Spinner from "../ui/Spinner";

export default function RemoveMemberButton({
  workspaceId,
  workspaceSlug,
  onSuccess,
  role,
  profileId,
  member,
}: {
  workspaceId: string;
  workspaceSlug: string;
  role: string;
  onSuccess: () => void;
  profileId: string;
  member: Member;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState<string>("");

  async function handleRemoveMember() {
    setIsRemoving(true);
    const result = await removeMemberAction({
      workspaceId,
      workspaceSlug,
      role,
      profileId,
    });
    if (!result.success && result.error) {
      setIsRemoving(false);
      setError(result.error);
    }
    setShowConfirm(false);
    onSuccess();
    setIsRemoving(false);
  }
  return (
    <div>
      <button
        onClick={() => setShowConfirm(true)}
        className="inline-flex items-center whitespace-nowrap gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 shadow-sm transition hover:bg-red-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/40"
      >
        Remove Member
      </button>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Remove Workspace Member?
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={() => handleRemoveMember()}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
              >
                {isRemoving ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Yes, Remove Member"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
