import { supabaseKey, supabaseUrl } from "@/utils/supabase";
import { axiosWithProxy } from "@/services/HttpService";

export async function getUserProfile(filter: {
  username?: string;
  id?: string;
}) {
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${supabaseKey}`,
  };
  let queryParam: string = "";

  if (filter.id) {
    queryParam = `id=eq.${filter.id}`;
  } else if (filter.username) {
    queryParam = `username=eq.${filter.username}`;
  }

  const url = `${supabaseUrl}/rest/v1/profiles?${queryParam}&select=*`;

  try {
    const response = await axiosWithProxy.get(url, { headers });
    return { success: true, profile: response.data[0], error: null };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.msg ||
        "Failed to get user's profile check your internet connection",
      profile: null,
    };
  }
}



