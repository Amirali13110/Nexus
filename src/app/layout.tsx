import type { Metadata } from "next";
import ProfileProvider from "@/components/profile/ProfileProvider";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import ThemeSync from "@/components/ThemeSync";

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
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <ProfileProvider>
          <Navbar />
          <ThemeSync />
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
