import { getAssignedIssues } from "@/services/issue/getAssignedIssues";
export default async function getAssignedIssuesAction() {
  const result = await getAssignedIssues();

  if (!result.success && result.error) {
    return {
      success: false,
      error: result.error,
    };
  }
  return { success: true, data: result.data };
}
