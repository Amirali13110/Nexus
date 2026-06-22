"use client";
import { useState } from "react";
import { deleteProjectAction } from "@/actions/project/DeleteProjectAction";
import Spinner from "../ui/Spinner";

export default function DeleteProjectButton({
  projectId,
  workspaceSlug,
  onSuccess,
}: {
  onSuccess: () => void;
  projectId: string;
  workspaceSlug: string;
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleDelete() {
    setIsPending(true);
    try {
      const result = await deleteProjectAction(projectId, workspaceSlug);
      if (result) {
        onSuccess();
      }
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
    >
      {isPending ? <Spinner size="sm" color="white" /> : "Yes, Delete"}
    </button>
  );
}
