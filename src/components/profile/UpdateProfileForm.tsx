"use client";
import { useActionState, useEffect } from "react";
import { updateProfileAction } from "@/actions/profile/UpdateProfileAction";
import { useProfileStore } from "@/store/profileStore";
import Spinner from "../ui/Spinner";

export default function UpdateProfileForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { profile, setProfile } = useProfileStore();
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    null,
  );

  useEffect(() => {
    if (state?.success && state.profile) {
      setProfile(state.profile);
      onSuccess();
    }
  }, [state, setProfile]);

  if (!profile)
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">Loading...</div>
    );

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-1.5">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={profile.username || ""}
          required
          disabled={isPending}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="full_name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          defaultValue={profile.full_name || ""}
          disabled={isPending}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="bio"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={profile.bio || ""}
          disabled={isPending}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#0066ff] focus:outline-none focus:ring-1 focus:ring-[#0066ff] disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
        />
      </div>

    

      {state?.error && <p className="text-sm text-red-500">{state.error}</p>}


      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-xl bg-[#0066ff] py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#0052cc] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-gray-900"
      >
        {isPending ? <Spinner size="sm" color="white" /> : "Save Changes"}
      </button>
    </form>
  );
}
