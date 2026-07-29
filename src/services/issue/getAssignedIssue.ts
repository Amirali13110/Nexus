"use server";

import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import type { ApiResult, Issue } from "@/lib/types";

export async function getAssignedIssue(
  issueId: string,
): Promise<ApiResult<Issue>> {
  const cookieStore = await cookies();

  const encodedToken = cookieStore.get("access_token")?.value;

  if (!encodedToken) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const accessToken = decodeURIComponent(encodedToken);

  try {
    const response = await axiosWithProxy.get(
      `${process.env.BACKEND_URL}/issues/assigned/${issueId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.detail || "Failed to fetch issue",
    };
  }
}
