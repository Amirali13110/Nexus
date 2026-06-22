import { create } from "zustand";
import { Workspace } from "@/lib/types";
import getWorkspacesAction from "@/actions/workspace/GetWorkspacesAction";

interface WorkspaceState {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  isLoading: boolean;
  error: string | null;
  setWorkspaces: (workspace: Workspace[]) => void;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string) => void;
  fetchWorkspaces: () => Promise<void>;
  updateWorkspaceInList: (updatedWorkspace: Workspace) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  currentWorkspace: null,
  isLoading: false,
  error: null,

  setWorkspaces: (workspaces) => set({ workspaces, isLoading: false }),
  setCurrentWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  updateWorkspaceInList:(updatedWorkspace) => 
    set((state)=>({
      workspaces: state.workspaces.map((w)=> w.id=== updatedWorkspace.id ? updatedWorkspace : w)
  })),

  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  fetchWorkspaces: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await getWorkspacesAction();
      console.log("Fetching workspace again")
      if (result) {
        if (result.success && result.workspaces) {
          set({ workspaces: result.workspaces, isLoading: false });
        } else {
          set({ error: result.error, isLoading: false });
        }
      }
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },
}));
