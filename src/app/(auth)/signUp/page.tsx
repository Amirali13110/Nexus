import Link from "next/link";
import SignUpForm from "../../../components/authentication/SignUpForm";
export default function SignUpPage() {
  return (
    <div>
      Sign Up Page
      <SignUpForm />
      <p>
        Already have an account <Link href="/signIn">Log in</Link>
      </p>
    </div>
  );
}
