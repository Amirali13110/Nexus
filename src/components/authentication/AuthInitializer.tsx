import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";

interface User {
  id: string;
  email: string;

  user_metadata: {
    username: string;
    avatar_url?: string;
    [key: string]: any;
  };
}

export default function AuthInitializer(user: User) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(
    function () {
      setUser(user);
    },
    [user, setUser],
  );
}
