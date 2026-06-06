"use server";

import { axiosWithProxy } from "../HttpService";
import { supabaseUrl, supabaseKey } from "@/utils/supabase";
import { cookies } from "next/headers";
import { slugify } from "@/utils/slugify";
import { ApiResult, CreateProjectInput } from "@/lib/types";
import { Project } from "@/lib/types";
import axios from "axios";

export async function createProject({
  name,
  description,
  workspace_id,
}: CreateProjectInput): Promise<ApiResult<Project>> {
  console.log("Fetching...");
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("access_token")?.value;
  if (!encodedToken) return { success: false, error: "User not authenticated" };
  const accessToken = decodeURIComponent(encodedToken);

  const slug = slugify(name);
  const headers = {
    apikey: supabaseKey,
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const body = { name, slug, description, workspace_id: workspace_id };

  try {
    console.log("Trying to fetch...");
    const response = await axiosWithProxy.post<Project>(
      `${supabaseUrl}/rest/v1/projects`,
      body,
      { headers },
    );
    if (!response.data) {
      return {
        success: false,
        error: response.data || "Failed to create project",
      };
    }
    const data = response.data;
    console.log(data);
    return { success: true, data: response.data };
  } catch (error: any) {
    "Can't create your project"
    return {
      success: false,
      error: error.response?.data?.msg || error.msg,
    };
  }
}
