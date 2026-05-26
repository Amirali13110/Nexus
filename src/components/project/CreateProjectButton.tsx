"use client";
import { useState } from "react";
import CreateProjectForm from "@/components/project/CreateProjectForm";

export default function CreateProjectButton({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "New Project"}
      </button>
      {showForm && <CreateProjectForm workspaceId={workspaceId} />}
    </div>
  );
}


