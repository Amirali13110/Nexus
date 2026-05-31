import { notFound } from "next/navigation";
import GetIssueByIdAction from "@/actions/issue/GetIssueByIdAction";
import IssueView from "@/components/issue/IssueView";
import { is } from "zod/locales";
export default async function IssuePage({
  params,
}: {
  params: Promise<{
    workspaceSlug: string;
    projectSlug: string;
    issueId: string;
  }>;
}) {
  const { issueId } = await params;
  const result = await GetIssueByIdAction(issueId);
  if (!result.success) notFound();
  if (!result.success || !result.data) {
    notFound();
  }
  const issue = result.data;

  return <IssueView issue={issue} />;
}
