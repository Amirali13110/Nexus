import { cookies } from "next/headers";
import { getPendingInvitationsByEmail } from "@/services/invitation/getPendingInvitationByEmail";
import InvitationList from "@/components/invitation/InvitationList";

export default async function InvitationsPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("auth_user")?.value;
  if (!userCookie) {
    return <div>Please log in to view invitations.</div>;
  }
  const { email } = JSON.parse(userCookie);

  const result = await getPendingInvitationsByEmail(email);
  const invitations = result.success ? result.data : [];

  return (
    <div>
      <h1>Pending Workspace Invitations</h1>
      <InvitationList invitations={invitations} />
    </div>
  );
}