import { axiosWithProxy } from "@/services/HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import axios from "axios";

export async function validateUser(token: string) {
  try {
    const response = await axiosWithProxy.get(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${token}`,
      },
    });

    return { isValid: true, user: response.data };
  } catch (error: any) {
    return { isValid: false };
  }
}
