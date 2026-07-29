import { cookies } from "next/headers";
import { axiosWithProxy } from "../HttpService";

export async function refreshAccessToken() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return null;
    }

    const response = await axiosWithProxy.post(
      `${process.env.BACKEND_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      },
    );

    const data = response.data

    return data
  } catch (error) {
    return null;
  }
}