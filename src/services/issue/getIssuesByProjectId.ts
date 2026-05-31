"use server"

import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import type { Issue, ApiResult } from "@/lib/types";
import axios from "axios";

export async function getIssuesByProjectId(
  projectId: string,
): Promise<ApiResult<Issue[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/issues?select=*&project_id=eq.${projectId}&order=priority.asc,created_at.desc`;

  try {
    const response = await axios.get(url, { headers });
    const data = response.data as Issue[];
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to fetch issues",
    };
  }
}
