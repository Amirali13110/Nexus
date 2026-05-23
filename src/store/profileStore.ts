import { create } from "zustand";
import { getUserProfile } from "@/services/profile/getUserProfile";
import { createJSONStorage, persist } from "zustand/middleware";

interface Profile {
  id: string;
  username: string;
  email: string;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  setError: (error: string) => void;
  clearProfile: () => void;
  setProfile: (profile: Profile) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profile: null,
      isLoading: false,
      error: null,

      setProfile: (profile: Profile) => {
        set({ profile });
      },

      setError: (error: string) => {
        set({ error });
      },

      clearProfile: () => {
        set({ profile: null, error: null });
      },
    }),
    {
      name: "nexus-profile-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({ profile: state.profile }),
    },
  ),
);
