import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import axios from "axios";
import { ApiResult, Invitation } from "@/lib/types";

export async function createInvitation({
  workspaceId,
  email,
  role = "member",
}: {
  workspaceId: string;
  email: string;
  role?: string;
}): Promise<ApiResult<Invitation>> {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const body = {
    workspace_id: workspaceId,
    email,
    role,
    token,
    expires_at: expiresAt,
  };

  try {
    const response = await axiosWithProxy.post<Invitation>(
      `${supabaseUrl}/rest/v1/workspace_invitations`,
      body,
      { headers },
    );
    console.log(response.data);
    return { success: true, data: response.data };
  } catch (error: any) {
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to create invitation";
    return { success: false, error: errorMsg };
  }
}
