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
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#09090b",
            color: "#f4f4f5",
            border: "1px solid #27272a",
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 12px 30px -10px rgba(0, 0, 0, 0.7)",
            letterSpacing: "-0.01em",
          },
        }}
      />{" "}
      {children}
    </div>
  );
}
