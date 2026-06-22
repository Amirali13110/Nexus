import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import { slugify } from "@/utils/slugify";
import { redirect } from "next/navigation";
import { ApiResult, Workspace } from "@/lib/types";

export async function updateWorkspace({
  workspaceId,
  name,
  description,
}: {
  workspaceId: string;
  name?: string;
  description?: string;
}): Promise<ApiResult<Workspace>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const body: any = {};
  if (name !== undefined) {
    body.name = name;
    body.slug = slugify(name);
  }
  if (description !== undefined) body.description = description;

  const url = `${supabaseUrl}/rest/v1/workspaces?id=eq.${workspaceId}`;

  try {
    const response = await axiosWithProxy.patch(url, body, { headers });
    const updated = Array.isArray(response.data)
      ? response.data[0]
      : response.data;

    return {
      success: true,
      redirectTo: `/workspace/${updated.slug}`,
      data: updated,
    };
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to update workspace";
    return { success: false, error: errorMsg };
  }
}
