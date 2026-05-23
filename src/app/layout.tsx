import type { Metadata } from "next";
import ProfileProvider from "@/components/profile/ProfileProvider";
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
    <html lang="en">
      <body>
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  );
}
