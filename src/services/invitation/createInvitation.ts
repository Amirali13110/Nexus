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

  const checkUrl = `${supabaseUrl}/rest/v1/workspace_invitations?select=id,token,role,expires_at,status&workspace_id=eq.${workspaceId}&email=eq.${encodeURIComponent(email)}`;
  try {
    const checkRes = await axiosWithProxy.get(checkUrl, { headers });
    const existing = checkRes.data;

    if (existing && existing.length > 0) {
      const accepted = existing.find((inv: any) => inv.status === "accepted");
      if (accepted) {
        return {
          success: false,
          error: "User is already a member of this workspace",
        };
      }

      const pending = existing.find((inv: any) => inv.status === "pending");
      if (pending) {
        return { success: true, data: pending };
      }
    }
  } catch (err) {
    console.warn(
      "Failed to check existing invitations, proceeding with creation.",
      err,
    );
  }
  try {
    const response = await axiosWithProxy.post<Invitation>(
      `${supabaseUrl}/rest/v1/workspace_invitations`,
      body,
      { headers },
    );
    const created = Array.isArray(response.data)
      ? response.data[0]
      : response.data;
    if (!created?.token) {
      return { success: false, error: "Invitation created but token missing" };
    }
    return { success: true, data: created };
  } catch (error: any) {
    if (error.response?.status === 409) {
      const retryCheck = await axiosWithProxy.get(checkUrl, { headers });
      const pending = retryCheck.data.find(
        (inv: any) => inv.status === "pending",
      );
      if (pending) return { success: true, data: pending };
    }
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Failed to create invitation";
    return { success: false, error: errorMsg };
  }
}
