import AuthNavbar from "@/components/ui/AuthNavbar";
import { Toaster } from "sonner";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AuthNavbar />
      <Toaster position="top-center" richColors closeButton />
      {children}
    </div>
  );
}
