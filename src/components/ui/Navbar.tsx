"use client";
import Link from "next/link";
import UserAvatar from "../profile/UserAvatar";
import { useProfileStore } from "@/store/profileStore";
import Logo from "./Logo";

export default function Navbar() {
  const { profile } = useProfileStore();
  const isAuthenticated = !!profile;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-black">
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 sm:px-4 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-1">
          <div className="">
            <Logo />
          </div>
    
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {isAuthenticated && <UserAvatar />}
        </div>
      </div>
    </header>
  );
}
