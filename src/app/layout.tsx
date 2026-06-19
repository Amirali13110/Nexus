import type { Metadata } from "next";
import ProfileProvider from "@/components/profile/ProfileProvider";
import "./globals.css";
import IssueProvider from "@/components/issue/IssueProvider";
import WorkspaceProvider from "@/components/workspace/WorkspaceProvider";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

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
      <body className="bg-white dark:bg-black">
        <ThemeProvider>
          <IssueProvider>
            <ProfileProvider>
              <WorkspaceProvider>{children}</WorkspaceProvider>
            </ProfileProvider>
          </IssueProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
