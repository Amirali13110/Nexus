import axios from "axios";
import { supabaseUrl  ,supabaseKey} from "@/utils/supabase";

export async function validateUser(token: string) {
  try {
    const response = await axios.get(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey:supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    });

    return { isValid: true, user: response.data };
  } catch (error: any) {
    console.log("Api error ", error?.response?.status, error?.response?.data);
    return { isValid: false };
  }
}
