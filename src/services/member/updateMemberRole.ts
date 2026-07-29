import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function updateMemberRole({
  memberId,
  workspaceId,
  role,
}: {
  memberId: string;
  workspaceId: string;
  role: string;
}) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "Unauthorized" };
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const url = `${process.env.BACKEND_URL}/workspaces/${workspaceId}/members/${memberId}/role`;
  const body = { role };

  try {
    const response = await axiosWithProxy.patch(url, body, { headers });
    const updated = response.data;
    return { success: true, data: updated };
  } catch (error: any) {
    console.log(error.response.data.detail.msg)
    
    return { success: false, error: error.response.data.detail || "Failed to update members role " };
  }
}
