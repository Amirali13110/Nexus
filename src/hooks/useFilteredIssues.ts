import { useMemo } from "react";
import { useIssueStore } from "@/store/issueStore";

export function useFilteredIssues() {
  const { issues, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder } = useIssueStore();

  return useMemo(() => {
    let result = [...issues];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (issue) =>
          issue.title.toLowerCase().includes(query) ||
          issue.description?.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((issue) => issue.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      result = result.filter((issue) => issue.priority === priorityFilter);
    }

    result.sort((a, b) => {
      
      if (sortBy === "priority") {
        return sortOrder === "asc" 
          ? a.priority - b.priority  
          : b.priority - a.priority;
      }

      if (sortBy === "created_at") {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      }

      if (sortBy === "due_date") {
        const timeA = a.due_date ? new Date(a.due_date).getTime() : null;
        const timeB = b.due_date ? new Date(b.due_date).getTime() : null;

        if (timeA === null && timeB === null) return 0;
        if (timeA === null) return 1;
        if (timeB === null) return -1;

        return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
      }

      return 0;
    });

    return result;
  }, [issues, searchQuery, statusFilter, priorityFilter, sortBy, sortOrder]);
}