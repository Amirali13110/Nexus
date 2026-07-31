"use server";
import { ApiResult, User } from "@/lib/types";
import { axiosWithProxy } from "../HttpService";
import { cookies } from "next/headers";

export async function getCurrentUser(): Promise<ApiResult<User>> {

  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;

  if (!encodedToken ) {
    return { success: false, error: "Not authenticated" };
  }

  const accessToken = decodeURIComponent(encodedToken);
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

   const url = `${process.env.BACKEND_URL}/auth/me`;
 
   try {
     const response = await axiosWithProxy.get<User>(url, { headers });
     const user = response.data;
     return { success: true, data: user };
   } catch (error: any) {
     return {
       success: false,
       error:
         error.response?.data?.detail ||
         "Failed to fetch user",
     };
   }
  
}

