import { useEffect } from "react";

export default function useRedirectAction<
  T extends { success?: boolean; redirectTo?: string },
>(state: T | null) {
  useEffect(
    function () {
      if (state?.success && state.redirectTo) {
        window.location.href = state.redirectTo;
      }
    },
    [state],
  );
}
