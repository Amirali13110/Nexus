"use client";

import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const { user, signOut } = useAuthStore();

  return (
    <div>
      Home page
      <button onClick={() => signOut()}>Log out </button>
    </div>
  );
}
