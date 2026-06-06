"use server";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import axios from "axios";

export async function createWorkspace({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) {
    return { success: false, error: "User session invalid." };
  }
  const { id:owner_id } = JSON.parse(userCookie);
  console.log(owner_id)
  if (!encodedToken) {
    return { success: false, error: "Not authenticated. Please log in again." };
  }
  const accessToken = decodeURIComponent(encodedToken);
  try {
    if (!accessToken) {
      console.error("No access token found in authStore");
      return {
        success: false,
        error: "Your session has expired. Please log in again.",
      };
    }
    const response = await axiosWithProxy.post(
      `${supabaseUrl}/rest/v1/workspaces`,
      { name, slug, owner_id },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${accessToken}`,
          Prefer: "return=representation",
        },
      },
    );

    return { success: true, data: response.data };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Workspace createion failed",
    };
  }
}
