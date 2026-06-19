"use server";
import z from "zod";
import { revalidatePath } from "next/cache";
import { updateProfile } from "@/services/profile/updateProfile";
import { cookies } from "next/headers";

const updateProfileSchema = z.object({
  username: z.string().min(3).max(50).optional(),
  full_name: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  avatar_url: z.string().url().optional(),
});

export async function updateProfileAction(prevState: any, formData: FormData) {
  const username = (formData.get("username") as string) || undefined;
  const full_name = (formData.get("full_name") as string) || undefined;
  const bio = (formData.get("bio") as string) || undefined;
  const avatar_url = (formData.get("avatar_url") as string) || undefined;

  const validation = updateProfileSchema.safeParse({
    username,
    full_name,
    bio,
    avatar_url,
  });
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) return { success: false, error: "Not authenticated" };
  const { id: profileId } = JSON.parse(userCookie);

  const result = await updateProfile({
    profileId,
    username,
    full_name,
    bio,
    avatar_url,
  });
  if (!result.success) return { success: false, error: result.error };

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/profile/edit");

  return { success: true, profile: result.data };
}
