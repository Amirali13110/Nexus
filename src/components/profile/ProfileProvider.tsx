"use client";
import { useEffect } from "react";
import { useProfileStore } from "@/store/profileStore";
import getProfileAction from "@/actions/profile/getProfileAction";

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, setProfile, setError } = useProfileStore();

  useEffect(() => {
    if (!profile) {
      getProfileAction().then((result) => {
        if (result.success && result.profile) {
          setProfile(result.profile);
        } else if (result.error) {
          setError(result.error);
        }
      });
    }
  }, [profile, setProfile]);

  return <>{children}</>;
}
