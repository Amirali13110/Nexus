import { getProjectBySlug } from "@/services/project/getProjectBySlug";
import { notFound } from "next/navigation";
import UpdateProjectForm from "@/components/project/UpdateProjectForm";
import DeleteProjectButton from "@/components/project/DeleteProjectButton";

export default async function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;

  const result = await getProjectBySlug({ projectSlug, workspaceSlug });
  if (!result.success) notFound();
  const project = result.data;

  if (!project) {
    return <p>Couldn't get project</p>;
  }

  return (
    <div>
      <h1>Project Settings</h1>
      <UpdateProjectForm project={project} workspaceSlug={workspaceSlug} />
      <DeleteProjectButton
        workspaceSlug={workspaceSlug}
        projectId={project?.id}
      />
    </div>
  );
}
