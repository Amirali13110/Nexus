"use server";
import z from "zod";
import { revalidatePath } from "next/cache";
import { updateWorkspace } from "@/services/workspace/updateWorkspace";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ApiResult, Workspace } from "@/lib/types";
const updateWorkspaceSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().max(200).optional(),
});

export async function updateWorkspaceAction(
  prevState: any,
  formData: FormData,
): Promise<ApiResult<Workspace>> {
  const workspaceId = formData.get("workspaceId") as string;
  const name = (formData.get("name") as string) || undefined;
  const description = (formData.get("description") as string) || undefined;

  const validation = updateWorkspaceSchema.safeParse({ name, description });
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) return { success: false, error: "Not authenticated" };

  const result = await updateWorkspace({ workspaceId, name, description });


  if (!result.success) return { success: false, error: result.error };


  return {
    success: true,
    redirectTo: result.redirectTo,
    data: result.data,
  };
}
