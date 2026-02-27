"use client";

import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
import { useEffect } from "react";

export default function Home() {
  const { profile, getProfile, isLoading, error } = useProfileStore();
  const { user, signOut } = useAuthStore();

  useEffect(
    function () {
      if (user?.id) {
        getProfile({ id: user.id });
      }
    },
    [getProfile],
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      Home page
      <div>{profile ? profile?.username : null}</div>
      <button onClick={() => signOut()}>Log out </button>
    </div>
  );
}
