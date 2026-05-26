"use client";
import type { Project } from "@/lib/types";

export default function ProjectView({ project }: { project: Project }) {
  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description || "No description"}</p>
    </div>
  );
}
