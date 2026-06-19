"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function IssueSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "priority";
  const currentOrder = searchParams.get("order") || "asc";

  const updateSort = (sort: string, order: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("order", order);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={currentSort}
        onChange={(e) => updateSort(e.target.value, currentOrder)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto [&>option]:bg-white [&>option]:py-1.5 [&>option]:px-3 [&>option]:text-gray-900 dark:[&>option]:bg-gray-800 dark:[&>option]:text-white [&>option]:hover:bg-gray-100 dark:[&>option]:hover:bg-gray-700"
      >
        <option value="priority">Sort by Priority</option>
        <option value="due_date">Sort by Due date</option>
        <option value="created_at">Sort by Created date</option>
      </select>

      <select
        value={currentOrder}
        onChange={(e) => updateSort(currentSort, e.target.value)}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-auto [&>option]:bg-white [&>option]:py-1.5 [&>option]:px-3 [&>option]:text-gray-900 dark:[&>option]:bg-gray-800 dark:[&>option]:text-white [&>option]:hover:bg-gray-100 dark:[&>option]:hover:bg-gray-700"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
