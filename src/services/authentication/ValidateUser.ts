import { supabaseUrl, supabaseKey } from "@/utils/supabase";

import { ProxyAgent, fetch as undiciFetch } from "undici";

const proxyDispatcher = new ProxyAgent({ uri: "http://127.0.0.1:10808" });
export async function validateUser(token: string) {
  try {
    const response = await undiciFetch(`${supabaseUrl}/auth/v1/user`, {
      method: "GET",
      headers: {
        apikey: `${supabaseKey}`,
        Authorization: `Bearer ${token}`,
      },
      dispatcher: proxyDispatcher,
    });

    if (!response.ok) {
      return { isValid: false };
    }

    const user = await response.json();

    return { isValid: true, user };
  } catch (error: any) {
    console.error(
      "Api network error during validation:",
      error.message || error,
    );
    return { isValid: false };
  }
}
