"use client";

import type { Issue, Profile, Project } from "@/lib/types";
import Link from "next/link";
import CreateIssueForm from "../issue/CreateIssueForm";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function ProjectView({
  project,
  issues,
  members,
  error,
}: {
  project: Project;
  issues: Issue[] | [];
  error: string | null;
  members: Profile[];
}) {
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description || "No description"}</p>
      <CreateIssueForm
        projectId={project.id}
        members={members}
        workspaceId={project.workspace_id}
      />
      <div>
        {issues.map((issue) => (
          <Link
            key={issue.id}
            href={`/workspace/${currentWorkspace?.slug}/project/${project.slug}/issue/${issue.id}`}
          >
            {issue.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
