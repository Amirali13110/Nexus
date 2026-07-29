import { ApiResult, Member } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function getMemberById({
  workspaceId,
  memberId,
}: {
  workspaceId: string;
  memberId: string;
}): Promise<ApiResult<Member>> {
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
      `${process.env.BACKEND_URL}/workspaces/${workspaceId}/members/${memberId}`,
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
      error: error.response?.data?.detail ?? "Failed to fetch member",
    };
  }
}
