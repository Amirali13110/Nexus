"use server"
import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function deleteIssue({issueId , workspaceId , projectId}:{issueId:string , workspaceId:string , projectId:string}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
const url = `${process.env.BACKEND_URL}/issues/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`;

  try {
    await axiosWithProxy.delete(url, { headers });
    return { success: true };
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete issue";
    return { success: false, error: errorMsg };
  }
}
