import axios from "axios";

export async function sendInviteEmail({
  to,
  invitationToken,
  workspaceName,
}: {
  to: string;
  invitationToken: string;
  workspaceName?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, error: "Email service not configured" };
  }
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/invite/accept/${invitationToken}`;
  const workspaceDisplay = workspaceName
    ? `workspace "${workspaceName}"`
    : "a workspace";

  try {
    const response = await axios.post(
      "https://api.resend.com/emails",
      {
        from: fromEmail,
        to: [to],
        subject: "You are invited to join a workspace",
        html: `<p>You have been invited to join ${workspaceDisplay}.</p>
               <p>Click <a href="${inviteLink}">here</a> to accept the invitation.</p>
               <p>This link expires in 7 days.</p>`,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );
    return { success: true };
  } catch (error: any) {
    console.error("Email send error:", error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
}
