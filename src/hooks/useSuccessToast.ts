import { useEffect } from "react";
import { toast } from "sonner";

export function useSuccessToast(message: string | undefined) {
  useEffect(
    function () {
      if (message) {
        toast.success(message);
      }
    },
    [message],
  );
}
