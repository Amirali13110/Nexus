import { cookies } from "next/headers";
import { getPendingInvitations } from "@/services/invitation/getPendingInvitations";
import InvitationList from "@/components/invitation/InvitationList";
import { Invitation } from "@/lib/types";

export default async function InvitationsPage() {
  const result = await getPendingInvitations();
  const invitations = result.success ? result.data : [];

  return (
    <div>
      <InvitationList invitations={invitations as Invitation[]} />
    </div>
  );
}
