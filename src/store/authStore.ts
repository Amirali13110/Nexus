import { create } from "zustand";
import { signUp as apiSignUp } from "../actions/authentication/SignUp";
import { signIn as apiSignIn } from "../actions/authentication/SignIn";
import Cookies from "js-cookie";

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

  signUp: (credentials: any) => Promise<AuthResponse>;
  signIn: (credentials: any) => Promise<AuthResponse>;

  signOut: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  initialize: () => {
    const savedUser = Cookies.get("auth_user");
    const token = Cookies.get("access_token");

    if (savedUser && token) {
      try {
        set({ user: JSON.parse(savedUser) });
      } catch {
        Cookies.remove("auth_user");
        set({ user: null });
      }
    }
  },

  signUp: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiSignUp(credentials);
      if (response.success && response?.data?.access_token) {
        Cookies.set("access_token", response?.data.access_token, {
          expires: 7,
        });
        Cookies.set("refresh_token", response?.data.refresh_token, {
          expires: 30,
        });
        Cookies.set("auth_user", JSON.stringify(response?.data.user), {
          expires: 7,
        });
        set({ user: response?.data.user });
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

  signIn: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiSignIn(credentials);

      if (response.success && response?.data?.access_token) {
        Cookies.set("access_token", response.data.access_token, { expires: 7 });
        Cookies.set("refresh_token", response.data.refresh_token, {
          expires: 30,
        });
        Cookies.set("auth_user", JSON.stringify(response.data.user), {
          expires: 7,
        });
        set({ user: response.data.user, isLoading: false });
        return { success: true, data: response.data };
      } else {
        const errorMessage = response.error || "Login failed";
        set({
          error: errorMessage,
          isLoading: false,
        });
        return {
          success: false,
          error: errorMessage,
        };
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

  signOut: () => {
    Cookies.remove("auth_user");
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    set({ user: null });
  },
}));
