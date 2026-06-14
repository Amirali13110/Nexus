import { create } from "zustand";

import { User } from "@/lib/types";
import { handleSignOut } from "@/actions/authentication/AuthActions";
import { redirect } from "next/navigation";
import { createJSONStorage, persist } from "zustand/middleware";
import { useProfileStore } from "./profileStore";

export type AuthResponse = {
  success: boolean;
  error?: string;
  data?: any;
};

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  access_token: string | null;
  refresh_token: string | null;

  signOut: () => void;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      access_token: null,
      refresh_token: null,

      setUser: (user: User) => {
        set({ user, isLoading: false });
      },

      signOut: async () => {
        await handleSignOut();
        useProfileStore.getState().clearProfile();
      },
    }),
    {
      name: "nexus-auth-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
