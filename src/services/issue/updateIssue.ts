import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function updateIssue({
  issueId,
  workspaceId,
  projectId,
  title,
  description,
  status,
  priority,
  assigneeId,
  dueDate,
}: {
  issueId: string;
  workspaceId: string;
  projectId: string;
  title?: string;
  description?: string;
  status?: string;
  priority?: number;
  assigneeId?: string | null;
  dueDate?: string | null;
}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const body: any = {};
  if (title !== undefined) body.title = title;
  if (description !== undefined) body.description = description;
  if (status !== undefined) body.status = status;
  if (priority !== undefined) body.priority = priority;
  if (assigneeId !== undefined) body.assignee_id = assigneeId || null;
  if (dueDate !== undefined) body.due_date = dueDate || null;

  const url = `${process.env.BACKEND_URL}/issues/workspaces/${workspaceId}/projects/${projectId}/issues/${issueId}`;

  try {
    const response = await axiosWithProxy.patch(url, body, { headers });
    const updated = response.data;
    return { success: true, data: updated };
  } catch (error: any) {
    console.log(error.response.data);
    const errorMsg = error.response?.data?.detail || "Failed to update issue";
    return { success: false, error: errorMsg };
  }
}
