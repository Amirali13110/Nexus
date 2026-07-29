import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import type { ApiResult } from "@/lib/types";

export async function acceptInvitation(
  invitationId: string,
): Promise<ApiResult<void>> {
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
    await axiosWithProxy.post(
      `${process.env.BACKEND_URL}/workspace-invitations/${invitationId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error.response?.data?.detail ??
        error.message ??
        "Failed to accept invitation",
    };
  }
}
