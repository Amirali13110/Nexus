import type { Issue, Project } from "@/lib/types";
import CreateIssueForm from "../issue/CreateIssueForm";

export default function ProjectView({
  project,
  issues,
  error,
}: {
  project: Project;
  issues: Issue[] | [];
  error: string | null;
}) {
  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description || "No description"}</p>
      <CreateIssueForm
        projectId={project.id}
        workspaceId={project.workspace_id}
      />
      <div>
        {issues.map((issue) => (
          <div key={issue.id}>{issue.title}</div>
        ))}
      </div>
    </div>
  );
}
