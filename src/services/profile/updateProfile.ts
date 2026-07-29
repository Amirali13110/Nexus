import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function updateProfile({
  username,
  full_name,
  bio,
  avatar_url,
}: {
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
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const body: any = {};
  if (username !== undefined) body.username = username;
  if (full_name !== undefined) body.full_name = full_name;
  if (bio !== undefined) body.bio = bio;
  if (avatar_url !== undefined) body.avatar_url = avatar_url;

  const url = `${process.env.BACKEND_URL}/profile/me`;

  try {
    const response = await axiosWithProxy.patch(url, body, { headers });
    const updated =  response.data;
    return { success: true, data: updated };
  } catch (error: any) {
    return { success: false, error: error.response.data.detail || "Failed to update profile" };
  }
}