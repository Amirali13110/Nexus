import { supabaseKey, supabaseUrl } from "@/utils/supabase";
import axios from "axios";

export async function signOut(token: string) {
  const url = `${supabaseUrl}/auth/v1/logout`;
  try {
    const response = await axios.post(url, {
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error(
      "SignOut Fetch Error:",
      error.response?.data || error.message,
    );
    return { success: false, error: error.message };
  }
}
