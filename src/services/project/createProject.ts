"use server";

import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import { slugify } from "@/utils/slugify";
import { ApiResult, CreateProjectInput } from "@/lib/types";
import { Project } from "@/lib/types";

export async function createProject({
  name,
  description,
  workspace_id,
}: CreateProjectInput): Promise<ApiResult<Project>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "User not authenticated" };
  const accessToken = decodeURIComponent(encodedToken);

  const slug = slugify(name);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const body = { name, slug, description, workspace_id: workspace_id };
  const url = `${process.env.BACKEND_URL}/workspaces/${workspace_id}/projects`;

  console.log(workspace_id)
  try {
    const response = await axiosWithProxy.post<Project>(
      url,
      body,
      { headers },
    );
    if (!response.data) {
      return {
        success: false,
        error: response.data || "Failed to create project",
      };
    }
    console.log(response)
    const project =  response.data;
    

    return { success: true, data: project };
  } catch (error: any) {
    console.log(error.response.data)
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to create project",
    };
  }
}
