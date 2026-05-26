"use server";

import { getUserProfile } from "@/services/profile/getUserProfile";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";

const getCachedProfile = unstable_cache(
  async (userId: string) => getUserProfile({ id: userId }),
  ["profile"],
  { revalidate: 60 * 60 }, // cache for 1 hour (adjust as needed)
);

export default async function getProfileAction() {
  const cookieStore = await cookies();

  try {
    const userCookie = cookieStore.get("auth_user")?.value;

    if (!userCookie) {
      return { success: false, error: "No auth_user cookie found" };
    }

    let id: string;
    try {
      const parsed = JSON.parse(userCookie);
      id = parsed.id;
      if (!id) {
        return { success: false, error: "User ID missing in auth_user cookie" };
      }
    } catch (parseErr) {
      console.error("Failed to parse auth_user cookie:", parseErr);
      return { success: false, error: "Invalid auth_user cookie format" };
    }

    const result = await getCachedProfile(id);
    const profile = result.data;

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    if (!result.success && result.error) {
      return { success: false, error: result.error };
    }

    return { success: true, profile, error: null };
  } catch (error: any) {
    console.error("getProfileAction unexpected error:", error);
    return { success: false, error: "Internal server error" };
  }
}
