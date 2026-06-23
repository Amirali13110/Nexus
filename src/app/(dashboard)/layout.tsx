import HashError from "@/components/ui/HashError";
import Navbar from "@/components/ui/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <HashError />
      {children}
    </div>
  );
}
