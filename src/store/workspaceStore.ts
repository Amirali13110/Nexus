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

  // The Create Action
  createWorkspace: (
    name: string,
    slug: string,
  ) => Promise<{ success: boolean; data?: Workspace; error?: string }>;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  workspaces: [],
  isLoading: false,
  error: null,

  createWorkspace: async (name: string, slug: string) => {
    set({ isLoading: true, error: null });

    try {
      const result = await createWorkspace({ name, slug });
      if (result.success && result.data) {
        set((state) => ({
          workspaces: [...state.workspaces, result.data],
          isLoading: false,
        }));
      }
      return { success: true, data: result.data };
    } catch (error: any) {
      const errorMessage = error.message || "An unexpected error occurred";
      set({ error: errorMessage, isLoading: false });

      return { success: false, error: errorMessage };
    }
  },
}));
