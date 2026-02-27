# Project Nexus 🚀

### Advanced Auth & Password Recovery System

This is a [Next.js](https://nextjs.org) project bootstrapped with `create-next-app`, heavily customized to implement a high-security **PKCE Auth flow** with **Supabase**.

---

## 🚀 Getting Started

## 🛡️ Security Architecture

Unlike standard implementations, Project Nexus handles authentication entirely on the server side:

- **Manual PKCE Handshake**: Secure generation of `code_verifier` and SHA-256 `code_challenge`.
- **Server-to-Server Auth**: Token exchange via Axios in Route Handlers.
- **HTTP-Only Cookies**: JWT tokens are stored securely to mitigate XSS/CSRF.

---

### 🛡️ Password Reset Flow

The recovery process follows a four-stage security handshake:

1. **Initiation**:
   - A high-entropy `code_verifier` is generated client-side.
   - A `code_challenge` is derived and sent to Supabase.
   - The verifier is stored in a secure `HttpOnly` cookie (`sb-auth-token-code-verifier`).

2. **Handshake (`/auth/callback`)**:
   - The server catches the authentication `code` from the email link.
   - It performs a manual POST exchange via Axios to the GoTrue `/token` endpoint.
   - **Compatibility Fix**: Sends both `code` and `auth_code` keys to satisfy GoTrue API requirements.

3. **Session Persistence**:
   - To resolve Next.js 15 "Cookie Shadowing," `access_token` and `refresh_token` are attached directly to the `NextResponse` redirect object.
   - This ensures the user session is atomic and persists immediately upon landing on the next page.

4. **Security**:
   - **Open Redirect Protection**: Uses a `safeNext` validation pattern to ensure all redirects stay within the application domain.
   - **Cleanup**: Automatically rotates/deletes the PKCE verifier cookie after a successful handshake.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Auth**: Supabase Auth (GoTrue)
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS

### 1. Environment Variables

Create a `.env.local` file and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
