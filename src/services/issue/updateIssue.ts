import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";

export async function updateIssue({
  issueId,
  title,
  description,
  status,
  priority,
  assigneeId,
  dueDate,
}: {
  issueId: string;
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
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const body: any = {};
  if (title !== undefined) body.title = title;
  if (description !== undefined) body.description = description;
  if (status !== undefined) body.status = status;
  if (priority !== undefined) body.priority = priority;
  if (assigneeId !== undefined) body.assignee_id = assigneeId || null;
  if (dueDate !== undefined) body.due_date = dueDate || null;

  const url = `${supabaseUrl}/rest/v1/issues?id=eq.${issueId}`;

  try {
    const response = await axiosWithProxy.patch(url, body, { headers });
    const updated = Array.isArray(response.data)
      ? response.data[0]
      : response.data;
    return { success: true, data: updated };
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to update issue";
    return { success: false, error: errorMsg };
  }
}
