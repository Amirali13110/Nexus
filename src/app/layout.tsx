import type { Metadata } from "next";
import ProfileProvider from "@/components/profile/ProfileProvider";
import "./globals.css";
import IssueProvider from "@/components/issue/IssueProvider";
import ThemeSync from "@/components/ui/ThemeSync";
import WorkspaceProvider from "@/components/workspace/WorkspaceProvider";

export const metadata: Metadata = {
  title: "Nexus",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <ThemeSync />
      </head>
      <body className="bg-white">
        <IssueProvider>
          <ProfileProvider>
            <WorkspaceProvider>{children}</WorkspaceProvider>
          </ProfileProvider>
        </IssueProvider>
      </body>
    </html>
  );
}
