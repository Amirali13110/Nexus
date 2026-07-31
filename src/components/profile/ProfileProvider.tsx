"use client";
import { useEffect } from "react";
import { useProfileStore } from "@/store/profileStore";
import getProfileAction from "@/actions/profile/GetProfileAction";

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, setProfile, setError } = useProfileStore();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!profile) {
        try {
          const result = await getProfileAction();
          if (result.success && result.profile) {
            setProfile(result.profile);
          }

          if (result.error) {
            setError(result.error);
          }
        } catch (err) {
          throw new Error("Failed to get profiles")
        }
      }
    };
    fetchProfile();
  }, [setProfile, setError]);

  return <>{children}</>;
}
