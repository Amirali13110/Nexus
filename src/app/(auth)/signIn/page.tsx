import Link from "next/link";
import SignInForm from "../../../components/authentication/SignInForm";

export default function SignInPage() {
  return (
    <div>
      Sign In Page
      <SignInForm />
      

      <Link href="/forgetPassword">forget password</Link>
      <p>
        Don't have any account? <Link href="/signUp">Join us now</Link>
      </p>
    </div>
  );
}
