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

# Nexus Authentication System

A complete, secure authentication implementation for **Nexus** – a mini Linear.app clone – built with Next.js, Supabase, Axios, and httpOnly cookies.

## Features

- ✅ Sign Up (email/password)
- ✅ Sign In (email/password)
- ✅ Sign Out
- ✅ Reset Password (email link flow)
- ✅ Update Password (authenticated users)
- ✅ httpOnly cookie storage for access/refresh tokens
- ✅ JWT offline validation (no network calls, no proxy timeouts)
- ✅ Server actions for all auth operations
- ✅ TypeScript support


### Profile Management
- ✅ Server‑side profile fetching with **`unstable_cache`** (1‑hour cache, no redundant Supabase calls)
- ✅ Global profile state with **Zustand** (includes `profile`, `isLoading`, `error`)
- ✅ `ProfileProvider` hydrates the store once – no duplicate requests
- ✅ Auto‑create missing profile rows via Supabase RPC (handles edge cases after password reset)


## Tech Stack

| Layer       | Technology                                              |
|-------------|---------------------------------------------------------|
| Framework   | Next.js 15+ (App Router)                                |
| Auth API    | Supabase (REST endpoints)                               |
| HTTP Client | Axios + native fetch (for middleware)                   |
| Cookies     | httpOnly (server‑side)                                  |
| Validation  | `jose` (local JWT verification)                         |
| Styling     | Tailwind CSS (your choice)                              |

## Architecture Overview
