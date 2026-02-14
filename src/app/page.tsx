import Link from "next/link";

export default async function Home() {
  return (
    <div className="">
      <Link href="/signUp">Join us now</Link>
      <Link href="/signIn">Log in</Link>
    </div>
  );
}
