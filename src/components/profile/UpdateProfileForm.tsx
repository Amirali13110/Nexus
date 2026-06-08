"use client";
import { useActionState, useEffect } from "react";
import { updateProfileAction } from "@/actions/profile/UpdateProfileAction";
import { useProfileStore } from "@/store/profileStore";

export default function UpdateProfileForm() {
  const { profile, setProfile } = useProfileStore();
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    null,
  );

  useEffect(() => {
    if (state?.success && state.profile) {
      setProfile(state.profile);
    }
  }, [state, setProfile]);

  if (!profile) return <div>Loading...</div>;

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={profile.username || ""}
          required
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="full_name">Full Name</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          defaultValue={profile.full_name || ""}
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          rows={3}
          defaultValue={profile.bio || ""}
          disabled={isPending}
        />
      </div>
      <div>
        <label htmlFor="avatar_url">Avatar URL</label>
        <input
          id="avatar_url"
          name="avatar_url"
          type="url"
          defaultValue={profile.avatar_url || ""}
          disabled={isPending}
        />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </button>
      {state?.error && <p>{state.error}</p>}
      {state?.success && (
        <p >Profile updated successfully!</p>
      )}
    </form>
  );
}
