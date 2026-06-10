"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function IssueSearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const updateUrl = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set("search", value);
      else params.delete("search");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateUrl(search);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search, updateUrl]);

  return (
    <input
      type="text"
      placeholder="Search issues..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
