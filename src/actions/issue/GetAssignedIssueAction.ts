import { getAssignedIssue } from "@/services/issue/getAssignedIssue";
export default async function getAssignedIssueAction(issueId: string) {
  const result = await getAssignedIssue(issueId);

  if (!result.success && result.error) {
    return {
      success: false,
      error: result.error,
    };
  }
  return { success: true, data: result.data };
}
