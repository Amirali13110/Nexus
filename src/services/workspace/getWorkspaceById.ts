import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function getWorkspaceById(workspaceId: string) {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken)
    return { success: false, error: "Unauthorized", data: null };
  const accessToken = decodeURIComponent(encodedToken);

  const url = `${process.env.BACKEND_URL}/workspaces/${workspaceId}`;
  try {
    const response = await axiosWithProxy.get(url, {
      headers: {  Authorization: `Bearer ${accessToken}` },
    });
    const workspace = response.data;
    if (!workspace)
      return { success: false, error:response.data.detail, data: null };
    return { success: true, data: workspace };
  } catch (error: any) {
    return { success: false, error: error.response.data.detail };
  }
}
