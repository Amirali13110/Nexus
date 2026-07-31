"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { getCurrentUser } from "@/services/authentication/getCurrentUser";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, setUser} = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {

          const result = await getCurrentUser();

          if (result.success && result.data) {
            setUser(result.data);
          }

        } catch (err) {
        } 
      }
    };

    fetchUser();
  }, [user, setUser]);

  return <>{children}</>;
}