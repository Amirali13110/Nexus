import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import type { Project, ApiResult } from "@/lib/types";

export async function getProjectById({projectId , workspaceId}: {
  projectId:string , 
  workspaceId:string
}): Promise<ApiResult<Project>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "User not authenticated" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${process.env.BACKEND_URL}/workspaces/${workspaceId}/projects/${projectId}`;

  try {
    const response = await axiosWithProxy.get(url, { headers });
    const project = response.data || null;
    console.log(response.data) 
    if (!project) return { success: false, error: "Project not found" };
    return { success: true, data: project };
  } catch (error: any) {
    return {
      success: false,
      error: error?.response.data.detail || "Failed to fetch project",
    };
  }
}
