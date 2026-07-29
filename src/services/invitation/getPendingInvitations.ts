import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";
import type { ApiResult, Invitation } from "@/lib/types";

export async function getPendingInvitations(): Promise<
  ApiResult<Invitation[]>
> {
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
    const response = await axiosWithProxy.get<Invitation[]>(
      `${process.env.BACKEND_URL}/workspace-invitations`,
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
      error:
        error.response?.data?.detail ??
        error.message ??
        "Failed to fetch pending invitations",
    };
  }
}
