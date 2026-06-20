"use client";
import { Member } from "@/lib/types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function IssueListFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={searchParams.get("status") || ""}
        onChange={(e) => updateFilter("status", e.target.value)}
        className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto"
      >
        <option value="">All statuses</option>
        <option value="backlog">Backlog</option>
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="in_review">In Review</option>
        <option value="done">Done</option>
      </select>

      <select
        value={searchParams.get("priority") || ""}
        onChange={(e) => updateFilter("priority", e.target.value)}
        className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto"
      >
        <option value="">All priorities</option>
        <option value="0">No priority</option>
        <option value="1">Urgent</option>
        <option value="2">High</option>
        <option value="3">Normal</option>
        <option value="4">Low</option>
      </select>

    </div>
  );
}
