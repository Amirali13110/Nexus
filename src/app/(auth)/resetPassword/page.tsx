import ResetPasswordForm from "@/components/authentication/ResetPasswordForm";
import { notFound } from "next/navigation";
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  const validFormat =
    typeof token === "string" && /^[A-Za-z0-9_-]{43}$/.test(token);

  if (!validFormat) {
    notFound();
  }

  return (
    <div>
      <ResetPasswordForm token={token} />
    </div>
  );
}
