import { getAllIssues } from "@/services/issue/getAllIssues";
export default async function getAllIssuesAction() {
  const result = await getAllIssues();

  console.log(result);
  if (!result.success && result.error) {
    return {
      success: false,
      error: result.error,
    };
  }
  return { success: true, data: result.data };
}
