import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function deleteProject({projectId , workspaceId}: {projectId:string , workspaceId:string}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${process.env.BACKEND_URL}/workspaces/${workspaceId}/projects/${projectId}`;
  try {
    await axiosWithProxy.delete(url, { headers });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.response?.data?.detail || "Failed to delete project" };
  }
}