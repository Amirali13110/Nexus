// store/issueStore.ts
import { create } from "zustand";
import { Issue } from "@/lib/types";

interface IssueState {
  issues: Issue[];
  isLoading: boolean;
  error: string | null;
  setIssues: (issues: Issue[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearIssues: () => void;
}

export const useIssueStore = create<IssueState>((set) => ({
  issues: [],
  isLoading: false,
  error: null,
  setIssues: (issues) => set({ issues, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearIssues: () => set({ issues: [], isLoading: false, error: null }),
}));
