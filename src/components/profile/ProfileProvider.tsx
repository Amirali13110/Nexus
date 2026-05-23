"use client";
import { useEffect } from "react";
import { useProfileStore } from "@/store/profileStore";

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, setProfile, setError } = useProfileStore();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!profile) {
          const module = await import("@/actions/profile/GetProfileAction");
          const GetProfileAction = module.default;
          const result = await GetProfileAction();
          if (result.success && result.profile) {
            setProfile(result.profile);
          }
          if (result.error) {
            setError(result.error);
          }
        }

        fetchProfile();
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
  }, [profile, setProfile, setError]);

  return <>{children}</>;
}
