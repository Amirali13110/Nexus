import Link from "next/link";
import SignInForm from "../../../components/authentication/SignInForm";
import Navbar from "@/components/ui/Navbar";

export default function SignInPage() {
  return (
    <div>
      <Navbar />

      <SignInForm />
    </div>
  );
}
