import { create } from "zustand";
import { getUserProfile } from "@/actions/profile/getUserProfile";

interface Profile {
  id: string;
  username: string;
  email: string;
}

interface ProfileState {
  profile: Profile | null;
  isLoading: boolean;
  error: string | null;
  getProfile: (filter: {
    id?: string;
    username?: string;
  }) => Promise<Profile | null>;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  isLoading: false,
  error: null,
  getProfile: async (filter) => {
    set({ isLoading: true, error: null });

    const data = await getUserProfile(filter);

    if (!data) {
      set({ isLoading: false, error: "User not found" });
      return null;
    }

    if (filter.id) {
      set({ profile: data, isLoading: false });
    } else {
      set({ isLoading: false });
    }

    return data;
  },
  clearProfile: () => {
    set({ profile: null, error: null });
  },
}));
