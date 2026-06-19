// components/project/ProjectList.tsx
import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectListProps {
  projects: Project[];
  workspaceSlug: string;
}

export default function ProjectList({
  projects,
  workspaceSlug,
}: ProjectListProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-950">
        <p className="text-gray-500 dark:text-gray-400">
          No projects yet. Create your first project to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/workspace/${workspaceSlug}/project/${project.slug}`}
          className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
        >
          <h3 className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-[#0066ff] dark:text-white">
            {project.name}
          </h3>
          {project.description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
          )}
          <div className="mt-3 text-sm font-medium text-[#0066ff] opacity-0 transition-opacity group-hover:opacity-100">
            View project →
          </div>
        </Link>
      ))}
    </div>
  );
}
