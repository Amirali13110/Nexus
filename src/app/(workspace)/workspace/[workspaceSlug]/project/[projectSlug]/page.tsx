// app/workspace/[workspaceSlug]/project/[projectSlug]/page.tsx
import { notFound } from "next/navigation";
import GetProjectBySlugAction from "@/actions/project/GetProjectBySlugAction";
import ProjectView from "@/components/project/ProjectView";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ workspaceSlug: string; projectSlug: string }>;
}) {
  const { workspaceSlug, projectSlug } = await params;
  const result = await GetProjectBySlugAction({ projectSlug, workspaceSlug });
  if (!result.success) {
    notFound();
  }
  if (result.project) {
    return <ProjectView project={result.project} />;
  }
}
