import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import { slugify } from "@/utils/slugify";
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
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const body: any = {};
  if (name !== undefined) {
    body.name = name;
    body.slug = slugify(name);
  }
  if (description !== undefined) body.description = description;

  const url = `${process.env.BACKEND_URL}/workspaces/${workspaceId}`;

  try {
    const response = await axiosWithProxy.patch(url, body, { headers });
    const updated = response.data;

    return {
      success: true,
      redirectTo: `/workspace/${updated.id}`,
      data: updated,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to update workspace",
    };
  }
}
