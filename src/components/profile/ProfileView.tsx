"use client";
import { useState } from "react";
import Modal from "../ui/Modal";
import UpdateProfileForm from "./UpdateProfileForm";
import { useProfileStore } from "@/store/profileStore";
import SignOutButton from "./SignOutButton";
import { useAuthStore } from "@/store/authStore";
import { redirect } from "next/navigation";

export default function ProfileView() {
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const { profile } = useProfileStore();
  const { access_token } = useAuthStore();
  if (!access_token) {
    redirect("/signIn");
  }
  const profileDetails = [
    {
      label: "Bio",
      value: profile?.bio,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h7" />
        </svg>
      ),
    },
    {
      label: "Username",
      value: profile?.username,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
        </svg>
      ),
    },
    {
      label: "Email Address",
      value: profile?.email,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#191c1e] dark:text-white transition-colors duration-200">
      <main className="py-12 px-4 max-w-md mx-auto">
        <section className="flex flex-col items-center mb-10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-[#0066ff] flex items-center justify-center text-white shadow-xl border-4 border-white dark:border-[#131313] overflow-hidden">
              <span className="text-4xl font-bold">A</span>
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-[#0050cb] dark:bg-[#0066ff] text-white p-2 rounded-full border-2 border-white dark:border-[#0a0a0a] shadow-md active:scale-90 transition-transform flex items-center justify-center"
              aria-label="Edit avatar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[16px] h-[16px]"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </button>
          </div>
          <div className="mt-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-[#191c1e] dark:text-white">
              {profile?.full_name}
            </h1>
          </div>
        </section>

        <section className="space-y-3">
          {profileDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#131313] border border-[#c2c6d8] dark:border-[#27272a] rounded-xl p-5 flex items-start justify-between group hover:border-[#0066ff] dark:hover:border-[#0066ff] active:scale-[0.99] transition-all duration-200 cursor-pointer"
            >
              <div className="space-y-1 flex-1 pr-4">
                <span className="font-mono uppercase tracking-widest text-[#727687] dark:text-[#a1a1aa] text-[10px] block">
                  {detail.label}
                </span>
                <p className="text-[15px] font-medium text-[#191c1e] dark:text-white leading-relaxed break-words">
                  {detail.value}
                </p>
              </div>
              <div className="text-[#727687] dark:text-[#a1a1aa] group-hover:text-[#0066ff] dark:group-hover:text-[#0066ff] transition-colors flex items-center justify-center pt-0.5 shrink-0">
                {detail.icon}
              </div>
            </div>
          ))}
        </section>

        {/* Action Buttons */}
        <section className="mt-12 space-y-4">
          <button
            type="button"
            className="w-full h-14 bg-[#0066ff] text-white rounded-xl text-lg font-medium flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
            onClick={() => setIsShowUpdateModal(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              <path d="M9 14h3" />
              <path d="M9 10h6" />
            </svg>
            Edit Profile
          </button>

          <SignOutButton profileToken={access_token} />
        </section>
      </main>

      {isShowUpdateModal && (
        <Modal
          isOpen={isShowUpdateModal}
          onClose={() => setIsShowUpdateModal(false)}
          title="Update profile"
        >
          <UpdateProfileForm onSuccess={() => setIsShowUpdateModal(false)} />
        </Modal>
      )}
    </div>
  );
}
