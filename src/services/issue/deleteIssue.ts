import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function deleteIssue(issueId: string) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/issues?id=eq.${issueId}`;
  try {
    await axiosWithProxy.delete(url, { headers });
    return { success: true };
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete issue";
    return { success: false, error: errorMsg };
  }
}
