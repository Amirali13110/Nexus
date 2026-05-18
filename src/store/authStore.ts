import { create } from "zustand";
import { signUp as apiSignUp } from "../services/authentication/SignUp";
import { signIn as apiSignIn } from "../services/authentication/SignIn";

import {
  handleSignOut,
  setAuthCookies,
} from "@/actions/authentication/AuthActions";
import { redirect } from "next/navigation";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthResponse = {
  success: boolean;
  error?: string;
  data?: any;
};

interface User {
  id: string;
  email: string;

  user_metadata: {
    username: string;
    avatar_url?: string;
    [key: string]: any;
  };
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  access_token: string | null;
  refresh_token: string | null;

  signUp: (credentials: any) => Promise<AuthResponse>;

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

      signUp: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiSignUp(credentials);
          if (response.success && response?.data?.access_token) {
            await setAuthCookies(response.data);
            set({
              user: response?.data.user,
              isLoading: false,
              access_token: response.data?.access_token,
              refresh_token: response.data?.refresh_token,
            });
            return { success: true, data: response.data };
          } else {
            set({ error: response.error, isLoading: false });
            return { success: false, error: response.error };
          }
        } catch (error: any) {
          const errorMessage = error.message || "An unexpected error occured";

          set({ error: errorMessage, isLoading: false });
          return {
            success: false,
            error: errorMessage,
          };
        }
      },

      signOut: async () => {
        await handleSignOut();
        redirect("/signIn");
      },
    }),
    {
      name: "nexus-auth-storage", // 3. Unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
