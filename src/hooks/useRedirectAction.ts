import { useEffect } from "react";

type ActionStateWithRedirect = {
  success?: boolean;
  redirectTo?: string;
  [key: string]: any;
};

export default function useRedirectAction<T extends ActionStateWithRedirect>(
  state: T | null | undefined,
) {
  useEffect(
    function () {
      if (state?.success && state.redirectTo) {
        window.location.href = state.redirectTo;
      }
    },
    [state],
  );
}
