import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { User } from "@/lib/types";

export default function AuthInitializer(user: User) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(
    function () {
      setUser(user);
    },
    [user, setUser],
  );
}
