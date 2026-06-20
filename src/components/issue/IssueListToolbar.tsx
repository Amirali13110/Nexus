"use client";

import { useIssueStore } from "@/store/issueStore";
import { SortField, SortOrder, IssueStatus, IssuePriority } from "@/lib/types";

export default function IssueListToolbar() {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    setSortOrder,
    sortBy,
    sortOrder,
    setSorting,
    resetFilters,
  } = useIssueStore();

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    statusFilter !== "all" ||
    priorityFilter !== "all";

  return (
    <div className="flex flex-wrap items-center gap-3  border-gray-200 bg-white  transition-colors dark:border-gray-800 dark:bg-[#131313]">
      <div className="relative w-full">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search issues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border w-full  border-gray-300 bg-white px-4 py-2.5 pl-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as IssueStatus | "all")
          }
          className="w-ful cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto"
        >
          <option value="all">All Statuses</option>
          <option value="backlog">Backlog</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="todo">In Review</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <select
          value={priorityFilter}
          onChange={(e) => {
            const val = e.target.value;
            setPriorityFilter(
              val === "all" ? "all" : (Number(val) as IssuePriority),
            );
          }}
          className="w-ful cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto"
        >
          <option value="all">All Priorities</option>
          <option value="1">Urgent</option>
          <option value="2">High</option>
          <option value="3">Medium</option>
          <option value="4">Low</option>
          <option value="0">No Priority</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={sortBy}
          onChange={(e) => setSorting(e.target.value as SortField)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto [&>option]:bg-white [&>option]:py-1.5 [&>option]:px-3 [&>option]:text-gray-900 dark:[&>option]:bg-gray-800 dark:[&>option]:text-white [&>option]:hover:bg-gray-100 dark:[&>option]:hover:bg-gray-700"
        >
          <option value="priority">Sort by Priority</option>
          <option value="due_date">Sort by Due date</option>
          <option value="created_at">Sort by Created date</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto [&>option]:bg-white [&>option]:py-1.5 [&>option]:px-3 [&>option]:text-gray-900 dark:[&>option]:bg-gray-800 dark:[&>option]:text-white [&>option]:hover:bg-gray-100 dark:[&>option]:hover:bg-gray-700"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
