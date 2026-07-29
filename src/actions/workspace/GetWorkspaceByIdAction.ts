"use server";
import { getWorkspaceById } from "@/services/workspace/getWorkspaceById";

export default async function getWorkspaceByIdAction(id: string) {
  const result = await getWorkspaceById(id);
  if (result.error) {
    return { success: false,  error: result.error };
  }
  return { success: true, data: result.data };
}
