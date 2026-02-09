import Link from "next/link";

export default async function Home() {
  return (
    <div className="">
      <Link href="/auth/signUp">Join us now</Link>
      <Link href="/auth/signIn">Log in</Link>
    </div>
  );
}
