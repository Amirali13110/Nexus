// "use client";

// import { acceptInvitationAction } from "@/actions/invitation/AcceptInvitationAction";

// export default async function AcceptInvitePage({
//   params,
// }: {
//   params: { token: string };
// }) {
//   const { token } = await params;
//   const result = await acceptInvitationAction(token);
//   if (result?.error) return <div>Error: {result.error}</div>;
//   return <div>Redirecting...</div>;
// }
"use client";
import { useEffect, useState } from "react";
import { acceptInvitationAction } from "@/actions/invitation/AcceptInvitationAction";
import { useParams } from "next/navigation";

export default function AcceptInvitePage({
  params,
}: {
  params: { token: string };
}) {
  const [status, setStatus] = useState<"loading" | "error" | "redirecting">(
    "loading",
  );
  const param = useParams<{ token: string }>();
  const token = param.token;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    acceptInvitationAction(token)
      .then((result) => {
        if (result?.error) {
          setError(result.error);
          setStatus("error");
        } else {
          setStatus("redirecting");
        }
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, [token]);

  if (status === "loading") return <p>Processing invitation...</p>;
  if (status === "error") return <p>Error: {error}</p>;
  return <p>Redirecting…</p>;
}
