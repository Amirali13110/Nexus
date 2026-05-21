"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useHashError() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const errorDesc = params.get("error_description");
      if (errorDesc) {
        setError(decodeURIComponent(errorDesc));

        router.replace(window.location.pathname);
      }
    }
  }, [router]);

  return error;
}
