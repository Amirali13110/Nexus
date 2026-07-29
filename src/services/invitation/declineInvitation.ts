import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function declineInvitation(invitationId: string) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) {
    return { success: false, error: "Unauthorized" };
  }
  const accessToken = decodeURIComponent(encodedToken);

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const url = `${process.env.BACKEND_URL}/workspace-invitations/${invitationId}/decline`;

  try {
    await axiosWithProxy.post(url, {}, { headers });
    return { success: true };
  } catch (error: any) {
    console.log(error.response.data)

    return { success: false, error: error.response.data.detail || "Failed to decline invitation" };
  }
}
