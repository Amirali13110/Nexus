import { supabaseKey, supabaseUrl } from "@/utils/supabase";
import axios from "axios";

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
    const response = await axios.get(url, { headers });
    return response.data[0] || null;
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    return null;
  }
}
