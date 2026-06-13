"use client";
import { Member } from "@/lib/types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function IssueFilters({ members }: { members: Member[] }) {
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
    <div>
      <select
        value={searchParams.get("status") || ""}
        onChange={(e) => updateFilter("status", e.target.value)}
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
      >
        <option value="">All priorities</option>
        <option value="0">No priority</option>
        <option value="1">Urgent</option>
        <option value="2">High</option>
        <option value="3">Normal</option>
        <option value="4">Low</option>
      </select>

      <select
        value={searchParams.get("assignee") || ""}
        onChange={(e) => updateFilter("assignee", e.target.value)}
      >
        <option value="">All assignees</option>
        {members.map((member) => (
          <option key={member.id} value={member.id}>
            {member.username}
          </option>
        ))}
      </select>
    </div>
  );
}
