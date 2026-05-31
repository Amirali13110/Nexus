// services/project/getProjectBySlug.ts
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import type { Project, ApiResult } from "@/lib/types";
import axios from "axios";

export async function getProjectBySlug({
  projectSlug,
  workspaceSlug,
}: {
  projectSlug: string;
  workspaceSlug: string;
}): Promise<ApiResult<Project>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "User not authenticated" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${supabaseUrl}/rest/v1/projects?select=*,workspace:workspace_id(slug)&slug=eq.${projectSlug}&workspace.slug=eq.${workspaceSlug}`;

  try {
    const response = await axios.get(url, { headers });
    const data = response.data;
    const project = data[0] || null;
    if (!project) return { success: false, error: "Project not found" };
    return { success: true, data: project };
  } catch (error: any) {
    return {
      success: false,
      error: error?.msg || "Failed to fetch project",
    };
  }
}
