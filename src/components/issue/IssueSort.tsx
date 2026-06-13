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
    <div>
      <select
        value={currentSort}
        onChange={(e) => updateSort(e.target.value, currentOrder)}
      >
        <option value="priority">Priority</option>
        <option value="due_date">Due date</option>
        <option value="created_at">Created date</option>
      </select>
      <select
        value={currentOrder}
        onChange={(e) => updateSort(currentSort, e.target.value)}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}
