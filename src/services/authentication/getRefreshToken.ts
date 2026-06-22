import { User } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";
import { supabaseKey, supabaseUrl } from "@/utils/supabase";

interface SupabaseAuthPayload {
  access_token: string;
  refresh_token: string;
  user: User;
}

export async function getRefreshToken(
  refreshToken: string,
): Promise<SupabaseAuthPayload> {
  try {
    const response = await axiosWithProxy.post<SupabaseAuthPayload>(
      `${supabaseUrl}/auth/v1/token?grant_type=refresh_token`,
      {
        refresh_token: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseKey,
        },
      },
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Direct Supabase Auth Axios API failure:",
      error?.response?.data || error.message,
    );
    throw new Error(
      error?.response?.data?.error_description ||
        "Failed to recharge token via GoTrue API.",
    );
  }
}
