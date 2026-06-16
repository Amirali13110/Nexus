import type { Metadata } from "next";
import ProfileProvider from "@/components/profile/ProfileProvider";
import "./globals.css";
import { Geist } from "next/font/google";
import IssueProvider from "@/components/issue/IssueProvider";
import ThemeSync from "@/components/ui/ThemeSync";
import ThemeToggle from "@/components/Button/ThemeToggle";
import WorkspaceSwitcher from "@/components/workspace/WorkspaceSwitcher";
import WorkspaceProvider from "@/components/workspace/WorkspaceProvider";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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
      <body className="bg-white dark:bg-black  ">
        <IssueProvider>
          <ProfileProvider>
            <WorkspaceProvider>{children}</WorkspaceProvider>
          </ProfileProvider>
        </IssueProvider>
      </body>
    </html>
  );
}
