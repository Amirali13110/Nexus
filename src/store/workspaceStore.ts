import { create } from "zustand";
import { createWorkspace } from "@/services/workspace/createWorkspace";

interface Workspace {
  id: string;
  name: string;
  slug: string;
  owner_id: string;
  created_at: string;
  updated_at: string;
  image_url?: string | null;
}

interface WorkspaceState {
  workspaces: Workspace[];
  isLoading: boolean;
  error: string | null;
  setWorkspaces: (workspace: Workspace[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  isLoading: false,
  error: null,

  setWorkspaces: (workspaces) => set({ workspaces, isLoading: false }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
}));
