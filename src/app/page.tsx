"use client";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const { signOut } = useAuthStore();

  return (
    <div>
      Home page
      <div>
        <ProfileInfo />
        <button onClick={() => signOut()}>Log out </button>
      </div>
    </div>
  );
}
