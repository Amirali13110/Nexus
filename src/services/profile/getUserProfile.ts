import { supabaseKey, supabaseUrl } from "@/utils/supabase";
import { axiosWithProxy } from "@/services/HttpService";
import { ApiResult, Profile } from "@/lib/types";
import axios from "axios";

export async function getUserProfile(filter: {
  username?: string;
  id?: string;
}): Promise<ApiResult<Profile>> {
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
    const response = await axiosWithProxy.get<Profile[]>(url, { headers });
    console.log("Response data:", response.data);

    return { success: true, data: response.data[0] };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.msg ||
        "Failed to get user's profile check your internet connection",
    };
  }
}
