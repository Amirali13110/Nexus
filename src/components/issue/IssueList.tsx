"use client";
import Link from "next/link";
import type { Project, Issue, Member } from "@/lib/types";
import IssueSearchBar from "@/components/issue/IssueSearchBar";
import IssueSort from "@/components/issue/IssueSort";
import IssueFilter from "../issue/IssueFilter";
import { useIssueStore } from "@/store/issueStore";
import IssueListTable from "./IssueListTable";
import IssueListFilter from "./IssueListFilter";
import IssueListToolbar from "./IssueListToolbar";
import { useFilteredIssues } from "@/hooks/useFilteredIssues";

const BackIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

export default function IssueList() {
  const { issues, error } = useIssueStore();
  const computedIssues = useFilteredIssues();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 pt-20 md:px-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href={`/`}
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <BackIcon />
            Back to home page
          </Link>
        </div>
      </div>

      <IssueListToolbar />

      {error ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-950">
          <p className="text-red-500">{error}</p>
        </div>
      ) : computedIssues.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-950">
          <p className="text-gray-500 dark:text-gray-400">
            No issues yet. Create one to get started.
          </p>
        </div>
      ) : (
        <IssueListTable issues={computedIssues} />
      )}
    </div>
  );
}
