"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function IssueSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      const currentSearch = searchParams.get("search") || "";
      if (search === currentSearch) return;

      const params = new URLSearchParams(searchParams.toString());
      if (search) params.set("search", search);
      else params.delete("search");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [search, searchParams, pathname, router]);

  return (
    <input
      type="text"
      placeholder="Search issues..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
