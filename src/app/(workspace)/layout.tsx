import WorkspaceProvider from "@/components/workspace/WorkspaceProvider";
export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="workspace-layout">
      <WorkspaceProvider>{children}</WorkspaceProvider>
    </div>
  );
}
