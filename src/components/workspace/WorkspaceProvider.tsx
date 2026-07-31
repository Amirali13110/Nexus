"use client";
import { useEffect } from "react";
import { useWorkspaceStore } from "@/store/workspaceStore";

export default function WorkspaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { workspaces, setWorkspaces, setError, setIsLoading } =
    useWorkspaceStore();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      if (workspaces.length === 0) {
        setIsLoading(true);
        try {
          const module =
            await import("@/actions/workspace/GetWorkspacesAction");
          const GetWorkspacesAction = module.default;

          const result = await GetWorkspacesAction();
          if (result?.success && result?.workspaces) {
            setWorkspaces(result.workspaces);
          } else if (result?.error) {
            setError(result.error);
          }
        } catch (err) {
          throw new Error("Failed to load workspaces")
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchWorkspaces();
  }, [workspaces.length, setWorkspaces, setError]);

  return <>{children}</>;
}
