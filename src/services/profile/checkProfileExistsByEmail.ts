import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";

export async function checkProfileExistsByEmail(email: string): Promise<boolean> {
  const url = `${supabaseUrl}/rest/v1/profiles?select=id&email=eq.${encodeURIComponent(email)}&limit=1`;
  try {
    const response = await axiosWithProxy.get(url, {
      headers: { apikey: supabaseKey },
    });
    const data = response.data;
    return Array.isArray(data) && data.length > 0;
  } catch (error) {
    console.error("Check profile exists error:", error);
    return false;
  }
}