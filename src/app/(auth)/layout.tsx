import AuthNavbar from "@/components/ui/AuthNavbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <AuthNavbar />
      {children}
    </div>
  );
}
