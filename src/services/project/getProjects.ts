"use server";

import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import { ApiResult, Project } from "@/lib/types";

export async function getProjectsByWorkspace(
  workspaceId: string,
): Promise<ApiResult<Project[]>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;

  if (!encodedToken) {
    return { success: false, error: "Not authenticated" };
  }

  const accessToken = decodeURIComponent(encodedToken);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${process.env.BACKEND_URL}/workspaces/${workspaceId}/projects`;

  try {
    const response = await axiosWithProxy.get<Project[]>(url, { headers });
    const projects = response.data;
    return { success: true, data: projects };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to fetch projects",
    };
  }
}
