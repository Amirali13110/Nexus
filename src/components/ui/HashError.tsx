"use client";

import { useHashError } from "@/hooks/useHashError";
import { useEffect } from "react";
import { toast } from "sonner";

export default function HashError() {
  const error = useHashError();

  useEffect(() => {
    if (error) {
      toast.error(error, {
        id: "hash-auth-error",
        duration: 7000,
      });
    }
  }, [error]);

  return null;
}
