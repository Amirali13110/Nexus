"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CreateProjectForm from "../project/CreateProjectForm";
import ProjectList from "../project/ProjectList";
import InviteMemberForm from "../invitation/InviteMemberForm";
import Modal from "@/components/ui/Modal";
import UpdateWorkspaceForm from "./UpdateWorkspaceForm";
import DeleteWorkspaceButton from "@/components/workspace/DeleteWorkspaceButton";
import type { Workspace, Project } from "@/lib/types";

const MembersIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SettingsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.14.14a2 2 0 0 0 0 2.73l.14.14a2 2 0 0 1 0 2.73l-.14.14a2 2 0 0 0 0 2.73l.14.14a2 2 0 0 0 2.73 0l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.14-.14a2 2 0 0 0 0-2.73l-.14-.14a2 2 0 0 1 0-2.73l.14-.14a2 2 0 0 0 0-2.73l-.14-.14a2 2 0 0 0-2.73 0l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const InviteIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <line x1="20" y1="8" x2="20" y2="14" />
    <line x1="23" y1="11" x2="17" y2="11" />
  </svg>
);

interface WorkspaceViewProps {
  workspace: Workspace;
  projects: Project[];
  role: string;
}

export default function WorkspaceView({
  workspace,
  projects,
  role,
}: WorkspaceViewProps) {
  const router = useRouter();
  const isAdmin = role === "owner" || role === "admin";
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const handleWorkspaceUpdate = () => {
    router.refresh();
    setIsSettingsModalOpen(false);
  };

  const handleProjectCreated = () => {
    router.refresh();
    setIsCreateProjectModalOpen(false);
  };

  const handleInviteSent = () => {
    setIsInviteModalOpen(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pt-20 md:px-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {workspace.name}
          </h1>
          {workspace.description && (
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {workspace.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/workspace/${workspace.slug}/members`}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <MembersIcon />
            Members
          </Link>
          {isAdmin && (
            <>
              <button
                onClick={() => setIsSettingsModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <SettingsIcon />
                Settings
              </button>
              <button
                onClick={() => setIsInviteModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0066ff] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc]"
              >
                <InviteIcon />
                Invite
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Projects
          </h2>
          {isAdmin && (
            <button
              onClick={() => setIsCreateProjectModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0066ff] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc]"
            >
              <PlusIcon />
              New Project
            </button>
          )}
        </div>
        <ProjectList projects={projects} workspaceSlug={workspace.slug} />
      </div>

      <Modal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        title="Workspace Settings"
      >
        <div className="space-y-6">
          <UpdateWorkspaceForm
            workspace={workspace}
            onSuccess={handleWorkspaceUpdate}
          />
          <hr className="border-gray-200 dark:border-gray-700" />
          <div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Danger zone – deleting this workspace will permanently remove all
              projects and issues.
            </p>
            <DeleteWorkspaceButton
              workspaceId={workspace.id}
              onSuccess={() => {
                setIsSettingsModalOpen(false);
                router.push("/");
              }}
            />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isCreateProjectModalOpen}
        onClose={() => setIsCreateProjectModalOpen(false)}
        title="Create Project"
      >
        <CreateProjectForm
          workspaceId={workspace.id}
          onSuccess={handleProjectCreated}
        />
      </Modal>

      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Members"
      >
        <InviteMemberForm
          workspaceId={workspace.id}
          onSuccess={handleInviteSent}
        />
      </Modal>
    </div>
  );
}
