import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import { slugify } from "@/utils/slugify";
import { ApiResult, Project } from "@/lib/types";

export async function updateProject({
  projectId,
  workspaceId,
  name,
  description,
}: {
  projectId: string;
  workspaceId:string
  name?: string;
  description?: string;
}): Promise<ApiResult<Project>> {
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

  const url = `${process.env.BACKEND_URL}/workspaces/${workspaceId}/projects/${projectId}`;

  try {
    const response = await axiosWithProxy.patch(url, body, { headers });
    const updated: Project = response.data;
    return {
      success: true,
      data: updated,
    };
  } catch (error: any) {

    return { success: false, error:
      error.response?.data?.detail ||
      "Failed to update project" };
  }
}
