import { create } from "zustand";
import {
  Issue,
  IssuePriority,
  IssueStatus,
  SortField,
  SortOrder,
} from "@/lib/types";

interface IssueState {
  issues: Issue[];

  isLoading: boolean;
  error: string | null;

  setIssues: (issues: Issue[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearIssues: () => void;
  searchQuery: string;
  statusFilter: IssueStatus | "all";
  priorityFilter: IssuePriority | "all";
  sortBy: SortField;
  sortOrder: SortOrder;

  setSearchQuery: (query: string) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  setStatusFilter: (status: IssueStatus | "all") => void;
  setPriorityFilter: (priority: IssuePriority | "all") => void;
  setSorting: (field: SortField) => void;
  resetFilters: () => void;
}

export const useIssueStore = create<IssueState>((set) => ({
  issues: [],
  isLoading: false,
  error: null,
  searchQuery: "",
  statusFilter: "all",
  priorityFilter: "all",
  sortBy: "created_at",
  sortOrder: "asc",

  setIssues: (issues) => set({ issues }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setPriorityFilter: (priorityFilter) => set({ priorityFilter }),
  setSorting: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  resetFilters: () =>
    set({
      searchQuery: "",
      statusFilter: "all",
      priorityFilter: "all",
      sortBy: "created_at",
      sortOrder: "asc",
    }),

  clearIssues: () => set({ issues: [], isLoading: false, error: null }),
}));
