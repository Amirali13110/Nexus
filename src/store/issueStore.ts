import { create } from "zustand";
import { Issue } from "@/lib/types";

interface IssueState {
  issues: Issue[];
  issuesByProjectId: Issue[];
  isLoading: boolean;
  error: string | null;
  setIssuesByProjectId: (issues: Issue[]) => void;
  setIssues: (issues: Issue[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearIssues: () => void;
}

export const useIssueStore = create<IssueState>((set) => ({
  issues: [],
  issuesByProjectId: [],
  isLoading: false,
  error: null,
  setIssues: (issues: Issue[]) =>
    set({ issues, isLoading: false, error: null }),
  setIssuesByProjectId: (issues: Issue[]) =>
    set({ issuesByProjectId: issues, isLoading: false, error: null }),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearIssues: () => set({ issues: [], isLoading: false, error: null }),
}));
