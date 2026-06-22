"use client";
import { useProfileStore } from "@/store/profileStore";
import { useState } from "react";
import Modal from "./Modal";
import CreateWorkspaceForm from "../workspace/CreateWorkspaceForm";

export default function WelcomeCard() {
  const { profile } = useProfileStore();
  const fullName = profile?.full_name || profile?.username || "there";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative overflow-hidden  rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow-md transition-all  dark:border-gray-700 dark:from-gray-950 dark:to-gray-950 sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#0066ff]/10 blur-3xl"></div>

      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Welcome back,{" "}
            <span className="whitespace-nowrap">{fullName}</span>{" "}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Here's what's happening with your workspaces today.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex w-full items-center justify-center cursor-pointer rounded-xl bg-[#0066ff] px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-[#0052cc] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-offset-2 dark:focus:ring-offset-gray-900 sm:w-auto"
        >
          + New Workspace
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create workspace"
      >
        <CreateWorkspaceForm onSuccess={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}
