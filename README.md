# Project Nexus 🚀
### Advanced Auth & Password Recovery System

This is a [Next.js](https://nextjs.org) project bootstrapped with `create-next-app`, heavily customized to implement a high-security **PKCE Auth flow** with **Supabase**.

---

## 🛡️ Security Architecture
Unlike standard implementations, Project Nexus handles authentication entirely on the server side:
- **Manual PKCE Handshake**: Secure generation of `code_verifier` and SHA-256 `code_challenge`.
- **Server-to-Server Auth**: Token exchange via Axios in Route Handlers.
- **HTTP-Only Cookies**: JWT tokens are stored securely to mitigate XSS/CSRF.

---

## 🚀 Getting Started

### 1. Environment Variables
Create a `.env.local` file and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key