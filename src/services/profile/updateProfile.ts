import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function updateProfile({
  profileId,
  username,
  full_name,
  bio,
  avatar_url,
}: {
  profileId: string;
  username?: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const body: any = {};
  if (username !== undefined) body.username = username;
  if (full_name !== undefined) body.full_name = full_name;
  if (bio !== undefined) body.bio = bio;
  if (avatar_url !== undefined) body.avatar_url = avatar_url;

  const url = `${supabaseUrl}/rest/v1/profiles?id=eq.${profileId}`;

  try {
    const response = await axiosWithProxy.patch(url, body, { headers });
    const updated = Array.isArray(response.data) ? response.data[0] : response.data;
    return { success: true, data: updated };
  } catch (error: any) {
    const errorMsg = error.response?.data?.message || error.message || "Failed to update profile";
    return { success: false, error: errorMsg };
  }
}