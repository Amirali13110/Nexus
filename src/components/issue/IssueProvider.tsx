"use client";
import { useEffect } from "react";
import { useIssueStore } from "@/store/issueStore";
import getAssignedIssuesAction from "@/actions/issue/GetAssignedIssuesAction";

export default function IssueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { issues, setIssues, setLoading, setError } = useIssueStore();

  useEffect(() => {
    if (issues.length === 0) {
      setLoading(true);
      getAssignedIssuesAction()
        .then((result) => {
          if (result.success && result.data) {
            setIssues(result.data);
          } else {
            setError(result.error || "Failed to load issues");
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, []);

  return <>{children}</>;
}
