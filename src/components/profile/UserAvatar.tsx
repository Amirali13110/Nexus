"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/profileStore";
import { useAuthStore } from "@/store/authStore";
import ThemeToggle from "../Button/ThemeToggle";
import Spinner from "../ui/Spinner";

export default function UserAvatar() {
  const router = useRouter();
  const { profile } = useProfileStore();
  const { signOut } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

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
    setIsSigningOut(true);
    signOut();
    setIsSigningOut(false);
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
            href="/invitations"
            className="block px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(false)}
          >
            Invitations
          </Link>
          <ThemeToggle />
          <button
            onClick={() => setShowConfirm(true)}
            className="block w-full px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700"
          >
            Log out
          </button>
          {showConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Do you want to sign out?
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone. All projects and issues will be
                  permanently removed.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                  >
                    {isSigningOut ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      " Yes, Sign out"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
