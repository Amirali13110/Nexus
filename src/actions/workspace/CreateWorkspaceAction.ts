"use server";

import { Workspace } from "@/lib/types";
import { addWorkspaceMember } from "@/services/member/addWorkspaceMember";
import { createWorkspace } from "@/services/workspace/createWorkspace";
import { slugify } from "@/utils/slugify";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

const createWorkspaceSchema = z.object({
  workspaceName: z.string().min(1, "Workspace name is required").max(50),
});

export async function createWorkspaceAction(
  prevState: any,
  formData: FormData,
) {
  const workspaceName = formData.get("workspace-name") as string;

  const validation = createWorkspaceSchema.safeParse({ workspaceName });
  if (!validation.success) {
    return {
      success: false,
      error:
        validation.error.flatten().fieldErrors.workspaceName?.[0] ||
        "Invalid name",
    };
  }

  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) {
    return { success: false, error: "User not authenticated" };
  }
  const { id: profileId } = JSON.parse(userCookie);

  const slug = slugify(workspaceName);
  const result = await createWorkspace({ name: workspaceName, slug });

  if (result.error) {
    return { success: false, error: result.error };
  }
  const workspace: Workspace = result.data[0];

  const memberResult = await addWorkspaceMember({
    workspaceId: workspace.id,
    profileId,
    role: "owner",
  });

  if (!memberResult.success && memberResult.error) {
    //Add delete workspace function here later
    return {
      success: false,
      error: memberResult.error || "Failed to create workspace",
    };
  }

  redirect(`/workspace/${slug}`);
}
