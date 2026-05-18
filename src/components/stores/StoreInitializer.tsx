"use client";

import { useRef } from "react";
import { useProfileStore } from "@/store/profileStore";

interface Profile {
  id: string;
  username: string;
  email: string;
}

interface StoreInitializerProps {
  profile: Profile | null;
}

export default function StoreInitializer({ profile }: StoreInitializerProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    if (profile) {
      useProfileStore.getState().setProfile(profile);
    }
  }
  initialized.current = true;

  return null;
}
