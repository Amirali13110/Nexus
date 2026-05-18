import { useAuthStore } from "@/store/authStore";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { axiosWithProxy } from "../HttpService";

export async function createWorkspace(
  name: string,
  slug: string,
  // owner_id: string,
) {
  const { access_token, user } = useAuthStore.getState();
  try {
    console.log(access_token)
    if (!access_token) {
      console.error("No access token found in authStore");
      return {
        success: false,
        error: "Your session has expired. Please log in again.",
      };
    }
    const response = await axiosWithProxy.post(
      `${supabaseUrl}/rest/v1/workspaces`,
      { name, slug, owner_id: user?.id },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
          Authorization: `Bearer ${access_token}`,
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
