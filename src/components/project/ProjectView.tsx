"use client";

import type { Issue, Member, Profile, Project } from "@/lib/types";
import Link from "next/link";
import CreateIssueForm from "../issue/CreateIssueForm";
import { useWorkspaceStore } from "@/store/workspaceStore";
import IssueSearchBar from "../issue/IssueSearchBar";

export default function ProjectView({
  project,
  issues,
  members,
  error,
}: {
  project: Project;
  issues: Issue[] | [];
  error: string | null;
  members: Member[];
}) {
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  return (
    <div>
      <IssueSearchBar />
      <h1>{project.name}</h1>
      <p>{project.description || "No description"}</p>
      <CreateIssueForm
        projectId={project.id}
        members={members}
        workspaceId={project.workspace_id}
      />
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <Link
              href={`/workspace/${currentWorkspace?.slug}/project/${project.slug}/issue/${issue.id}`}
            >
              {issue.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
