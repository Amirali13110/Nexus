// services/issue/createIssue.ts
import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import type { Issue, ApiResult } from "@/lib/types";
import axios from "axios";

export async function createIssue({
  title,
  description,
  status,
  priority,
  projectId,
  workspaceId,
  assigneeId,
  dueDate,
}: {
  title: string;
  description: string;
  status: string;
  priority: number;
  projectId: string;
  workspaceId: string;
  assigneeId: string | null;
  dueDate: string | null;
}): Promise<ApiResult<Issue>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!encodedToken || !userCookie) {
    return { success: false, error: "Unauthorized" };
  }
  const accessToken = decodeURIComponent(encodedToken);
  const { id: userId } = JSON.parse(userCookie);

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  let assignee_id = assigneeId === "" ? null : assigneeId;

  const body = {
    title,
    description: description || null,
    status,
    priority,
    project_id: projectId,
    workspace_id: workspaceId,
    created_by: userId,
    assignee_id,
    due_date: dueDate || null,
  };

  const url = `${supabaseUrl}/rest/v1/issues`;

  try {
    const response = await axiosWithProxy.post<Issue>(url, body, {
      headers,
    });
    const createdIssue = response.data as Issue;
    return { success: true, data: createdIssue };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.message ||
        error.message ||
        "Failed to create issue",
    };
  }
}
