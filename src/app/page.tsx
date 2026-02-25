"use client";

import { useProfileStore } from "@/store/profileStore";
import { useEffect } from "react";

export default function Home() {
  const { profile, getProfile, isLoading, error } = useProfileStore();

  useEffect(
    function () {
      getProfile({ id: "6e67d4a9-d69a-4c52-8923-94685b8cb73f" });
    },
    [getProfile],
  );
  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      Home page
      <div>{profile ? profile?.username : null}</div>
    </div>
  );
}
