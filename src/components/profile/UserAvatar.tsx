"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";
import signOutAction from "@/actions/authentication/SignOutAction";
import { useAuthStore } from "@/store/authStore";

export default function UserAvatar() {
  const router = useRouter();
  const { profile } = useProfileStore();
  const { signOut } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    signOut();
    router.push("/signIn");
  };

  const initial = profile?.username?.[0]?.toUpperCase() || "U";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-300 bg-gray-200 transition-colors hover:bg-gray-300 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
        aria-label="User menu"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {initial}
        </span>
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="border-b border-gray-200 px-4 py-2 text-sm font-medium text-gray-900 dark:border-gray-700 dark:text-white">
            {profile?.username || "Guest"}
          </div>
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
          <Link
            href="/workspace/invitations"
            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Invitations
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
