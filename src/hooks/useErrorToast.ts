import { useEffect } from "react";
import { toast } from "sonner";

export function useErrorToast(error: string | undefined) {
  useEffect(
    function () {
      if (error) {
        toast.error(error);
      }
    },
    [error],
  );
}
