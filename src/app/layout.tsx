import type { Metadata } from "next";
import ProfileProvider from "@/components/profile/ProfileProvider";
import "./globals.css";
import IssueProvider from "@/components/issue/IssueProvider";
import WorkspaceProvider from "@/components/workspace/WorkspaceProvider";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import HashError from "@/components/ui/HashError";
import AuthProvider from "@/components/authentication/AuthProvider";

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
      <body className="bg-white dark:bg-black ">
        <ThemeProvider>
          <IssueProvider>
            <ProfileProvider>
              <WorkspaceProvider>
                <AuthProvider>
                {children}
                </AuthProvider>
                <HashError />
              </WorkspaceProvider>
            </ProfileProvider>
          </IssueProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
