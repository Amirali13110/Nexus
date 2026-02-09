import { createClient } from "@/utils/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    return <div>Error!</div>;
  }

  console.log(data)

  return (
    <div className="">
      <Link href="/auth/signUp">Join us now</Link>
      <Link href="/auth/signIn">Log in</Link>
      {JSON.stringify(data, null, 2)}
    </div>
  );
}
