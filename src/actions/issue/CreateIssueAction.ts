"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { createIssue } from "@/services/issue/createIssue";
import { redirect } from "next/navigation";
import type { ApiResult, Issue } from "@/lib/types";

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional(),
  status: z.enum(["backlog", "todo", "in_progress", "in_review", "done"]),
  priority: z.number().int().min(0).max(4),
  projectId: z.string().uuid("Invalid project ID"),
  workspaceId: z.string().uuid("Invalid workspace ID"),
  assigneeId: z.string().uuid().nullish(),
  dueDate: z.string().date().nullish(),
});

export async function createIssueAction(
  prevState: ApiResult<Issue> | null,
  formData: FormData,
) {
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const status = formData.get("status") as string;
  const priority = Number(formData.get("priority"));
  const projectId = formData.get("projectId") as string;
  const workspaceId = formData.get("workspaceId") as string;
  const projectSlug = formData.get("projectSlug") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const assigneeId = formData.get("assigneeId") as string;

  const dueDate = (formData.get("dueDate") as string) || null;

  const validation = createIssueSchema.safeParse({
    title,
    description,
    status,
    priority,
    projectId,
    workspaceId,
    assigneeId,
    dueDate,
  });
  if (!validation.success) {
    const firstError = validation.error.issues[0].message;
    console.log(firstError);
    return { success: false, error: firstError };
  }

  const result = await createIssue({
    title,
    description,
    status,
    priority,
    projectId,
    workspaceId,
    assigneeId,
    dueDate,
  });
  if (!result.success) {
    return { success: false, error: result.error };
  }

  if (!result.success) return { success: false, error: result.error };
  const path = `/workspace/${workspaceSlug}/project/${projectSlug}`;

  revalidatePath(path);
  redirect(path);
}
