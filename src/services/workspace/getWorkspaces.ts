import { ApiResult, Workspace } from "@/lib/types";
import { cookies } from "next/headers";
import { axiosWithProxy } from "../HttpService";

export async function getWorkspaces(): Promise<ApiResult<Workspace[]>> {
  const cookieStore = await cookies();

  const encodedToken = cookieStore.get("access_token")?.value;

  if (!encodedToken) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${process.env.BACKEND_URL}/workspaces`;

  try {
    const response = await axiosWithProxy.get<Workspace[]>(url, {
      headers,
    });

    const workspaces = response.data;

    return {
      success: true,
      data: workspaces,
    };

  } catch (error: any) {
    console.error("Fetch workspaces error:", error);

    return {
      success: false,
      error:
        error.response?.data?.detail ||
        "Failed to fetch workspaces",
    };
  }
}