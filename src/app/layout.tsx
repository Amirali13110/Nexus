import type { Metadata } from "next";

import getProfileAction from "@/actions/profile/getProfileAction";
import ProfileProvider from "@/components/profile/ProfileProvider";
import { useProfileStore } from "@/store/profileStore";

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
