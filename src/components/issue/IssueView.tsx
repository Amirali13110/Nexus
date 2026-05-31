"use client";
import type { Issue } from "@/lib/types";

const priorityLabels: Record<number, string> = {
  0: "No priority",
  1: "Urgent",
  2: "High",
  3: "Normal",
  4: "Low",
};

export default function IssueView({ issue }: { issue: Issue }) {
  return (
    <div>
      <h1>{issue.title}</h1>
      <p><strong>Status:</strong> {issue.status}</p>
      <p><strong>Priority:</strong> {priorityLabels[issue.priority]}</p>
      <p><strong>Assignee:</strong> {issue.assignee_username || "Unassigned"}</p>
      <p><strong>Due date:</strong> {issue.due_date || "Not set"}</p>
      <p><strong>Description:</strong></p>
      <p>{issue.description || "No description"}</p>
      <p><small>Created: {new Date(issue.created_at).toLocaleString()}</small></p>
      <p><small>Updated: {new Date(issue.updated_at).toLocaleString()}</small></p>
    </div>
  );
}