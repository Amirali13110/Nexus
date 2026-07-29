import { cookies } from "next/headers";
import type { Issue, ApiResult } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";

export async function getIssueById({issueId , workspaceId , projectId}: {issueId:string, workspaceId:string , projectId:string}): Promise<ApiResult<Issue>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
  const url = `${process.env.BACKEND_URL}/issues/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`;
    const issueRes = await axiosWithProxy.get(url, { headers });
    const issue = issueRes.data;
    if (!issue) return { success: false, error: "Issue not found" };


    return { success: true, data: issue };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to fetch issue" };
  }
}
