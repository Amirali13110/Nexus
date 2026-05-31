"use client";
import { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";
import { useProjectStore } from "@/store/projectStore";
import { Workspace, Project } from "@/lib/types";

export default function ProjectInitializer({
  workspace,
  project,
}: {
  workspace: Workspace;
  project: Project;
}) {
  const setCurrentWorkspace = useWorkspaceStore((s) => s.setCurrentWorkspace);
  const setCurrentProject = useProjectStore((s) => s.setCurrentProject);

  useEffect(() => {
    setCurrentWorkspace(workspace);
    setCurrentProject(project);
  }, [workspace, project, setCurrentWorkspace, setCurrentProject]);

  return null;
}
