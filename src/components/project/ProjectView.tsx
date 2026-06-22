"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Project, Issue, Member } from "@/lib/types";
import IssueTable from "@/components/issue/IssueTable";
import IssueSearchBar from "@/components/issue/IssueSearchBar";
import IssueSort from "@/components/issue/IssueSort";
import Modal from "@/components/ui/Modal";
import CreateIssueForm from "@/components/issue/CreateIssueForm";
import UpdateIssueForm from "@/components/issue/UpdateIssueForm";

import IssueFilter from "../issue/IssueFilter";
import { deleteIssueAction } from "@/actions/issue/DeleteIssueAction";
import { useIssueStore } from "@/store/issueStore";
import UpdateProjectForm from "./UpdateProjectForm";
import DeleteProjectButton from "./DeleteProjectButton";
const BackIcon = () => (
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
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
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

interface ProjectViewProps {
  project: Project;
  role: string;
  userId: string;
  issues: Issue[];
  members: Member[];
  error: string | null;
  workspaceSlug: string;
}

export default function ProjectView({
  project,
  issues,
  members,
  userId,
  error,
  role,
  workspaceSlug,
}: ProjectViewProps) {
  // const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [deletingIssueId, setDeletingIssueId] = useState<string | null>(null);
  const [isDeletingProject, setIsDeletingProject] = useState(false);
  const isAdmin = role === "owner" || role === "admin";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pt-20 md:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href={`/workspace/${workspaceSlug}`}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <BackIcon />
            Back to workspace
          </Link>
          <h1 className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
            {project.name}
          </h1>
          {project.description && (
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {isAdmin && (
            <>
              <button
                onClick={() => setIsEditingProject(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <SettingsIcon />
                Settings
              </button>
            </>
          )}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0066ff] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc]"
          >
            <PlusIcon />
            New Issue
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <IssueSearchBar />
        <IssueFilter members={members} />
        <IssueSort />
      </div>

      {error ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-950">
          <p className="text-red-500">{error}</p>
        </div>
      ) : issues.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-950">
          <p className="text-gray-500 dark:text-gray-400">
            No issues yet. Create one to get started.
          </p>
        </div>
      ) : (
        <IssueTable
          issues={issues}
          onEdit={(issue: Issue) => setEditingIssue(issue)}
          workspaceSlug={workspaceSlug}
          projectSlug={project.slug}
          userId={userId}
          role={role}
          onDelete={(issueId: string) => setDeletingIssueId(issueId)}
        />
      )}

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Issue"
      >
        <CreateIssueForm
          projectId={project.id}
          workspaceId={project.workspace_id}
          members={members}
          onSuccess={() => {
            setIsCreateModalOpen(false);
          }}
        />
      </Modal>

      <Modal
        isOpen={!!editingIssue}
        onClose={() => setEditingIssue(null)}
        title="Edit Issue"
      >
        {editingIssue && (
          <UpdateIssueForm
            issue={editingIssue}
            projectId={project.id}
            workspaceSlug={workspaceSlug}
            projectSlug={project.slug}
            members={members}
            onSuccess={() => {
              setEditingIssue(null);
            }}
          />
        )}
      </Modal>

      <Modal
        title="Edit Project"
        isOpen={isEditingProject}
        onClose={() => setIsEditingProject(false)}
      >
        <div className="space-y-6">
          <UpdateProjectForm
            project={project}
            workspaceSlug={workspaceSlug}
            onSuccess={() => setIsEditingProject}
          />
          <hr className="border-gray-200 dark:border-gray-700" />
          <div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Danger zone – deleting this workspace will permanently remove all
              projects and issues.
            </p>
            <button
              className="flex w-full items-center justify-center rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 disabled:opacity-50 dark:bg-red-950/30 dark:text-red-400 dark:border dark:border-red-900/50 dark:hover:bg-red-900/40 dark:focus:ring-offset-gray-900 max-w-xl"
              onClick={() => setIsDeletingProject(true)}
            >
              Delete Project
            </button>
          </div>
        </div>
      </Modal>
      {isDeletingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Issue?
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsDeletingProject(false)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <DeleteProjectButton
                workspaceSlug={workspaceSlug}
                projectId={project.id}
                onSuccess={() => setIsDeletingProject(false)}
              />
            </div>
          </div>
        </div>
      )}
      {deletingIssueId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Issue?
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeletingIssueId(null)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await deleteIssueAction({
                    deletingIssueId,
                    workspaceSlug,
                    projectSlug: project.slug,
                  });
                  setDeletingIssueId(null);
                }}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
