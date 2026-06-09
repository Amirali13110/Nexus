"use server";
import z from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { updateIssue } from "@/services/issue/updateIssue";

const updateIssueSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional(),
  status: z
    .enum(["backlog", "todo", "in_progress", "in_review", "done"])
    .optional(),
  priority: z.number().int().min(0).max(4).optional(),
  assigneeId: z.string().uuid().optional().nullable(),
  dueDate: z.string().optional().nullable(),
});

export async function updateIssueAction(prevState: any, formData: FormData) {
  const issueId = formData.get("issueId") as string;
  const projectId = formData.get("projectId") as string;
  const workspaceSlug = formData.get("workspaceSlug") as string;
  const projectSlug = formData.get("projectSlug") as string;

  const title = (formData.get("title") as string) || undefined;
  const description = (formData.get("description") as string) || undefined;
  const status = (formData.get("status") as string) || undefined;
  const priority = formData.get("priority")
    ? Number(formData.get("priority"))
    : undefined;
  const assigneeId = (formData.get("assigneeId") as string) || null;
  const dueDate = (formData.get("dueDate") as string) || null;

  const validation = updateIssueSchema.safeParse({
    title,
    description,
    status,
    priority,
    assigneeId,
    dueDate,
  });
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message };
  }

  const result = await updateIssue({
    issueId,
    title,
    description,
    status,
    priority,
    assigneeId,
    dueDate,
  });
  if (!result.success) return { success: false, error: result.error };

  revalidatePath(
    `/workspace/${workspaceSlug}/project/${projectSlug}/issue/${issueId}`,
  );
  redirect(
    `/workspace/${workspaceSlug}/project/${projectSlug}/issue/${issueId}`,
  );
}
