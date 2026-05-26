import Link from "next/link";
import getProjectsAction from "@/actions/project/GetProjectsAction";

export default async function ProjectList({
  workspaceId,
  workspaceSlug,
}: {
  workspaceId: string;
  workspaceSlug: string;
}) {
  const { projects, error } = await getProjectsAction(workspaceId);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ul>
        {projects?.map((project) => (
          <Link
            key={project.id}
            href={`/workspace/${workspaceSlug}/project/${project.slug}`}
          >
            <li>{project.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
