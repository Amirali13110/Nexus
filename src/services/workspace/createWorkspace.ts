"use server";
import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import { ApiResult, Workspace } from "@/lib/types";

export async function createWorkspace({
  name,
  description,
  slug,
}: {
  name: string;
  description?:string;
  slug: string;
}): Promise<ApiResult<Workspace>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) {
    return { success: false, error: "User session invalid." };
  }
  const { id: owner_id } = JSON.parse(userCookie);
  if (!encodedToken) {
    return { success: false, error: "Not authenticated. Please log in again." };
  }
  const accessToken = decodeURIComponent(encodedToken);
  try {
    if (!accessToken) {
      console.error("No access token found in authStore");
      return {
        success: false,
        error: "Your session has expired. Please log in again.",
      };
    }
    const response = await axiosWithProxy.post(
      `${process.env.BACKEND_URL}/workspaces`,
      { name, slug, description ,owner_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return { success: true, data: response.data };
  } catch (error: any) {
   
    return { success: false, error: error?.response?.data?.detail || "Failed to create workspace" };
  }
}
