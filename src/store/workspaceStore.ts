import { create } from "zustand";
import { Workspace } from "@/lib/types";

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  isLoading: boolean;
  error: string | null;
  setWorkspaces: (workspace: Workspace[]) => void;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  currentWorkspace: null,
  isLoading: false,
  error: null,

  setWorkspaces: (workspaces) => set({ workspaces, isLoading: false }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
}));
