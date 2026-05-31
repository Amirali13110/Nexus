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

### Workspaces

- **Create workspace** – Users can create a workspace by providing a name. A URL‑friendly slug is auto‑generated. The workspace is stored in Supabase with the authenticated user as `owner_id`.
- **List workspaces** – Only workspaces owned by the current user are fetched (filtered by `owner_id`). Data is cached server‑side with `unstable_cache` (1 hour) and stored globally in a Zustand store.
- **Global store** – `WorkspaceProvider` (wrapped in the workspace layout) fetches workspaces once and populates the store. Any component can access `useWorkspaceStore().workspaces`.
- **Loading & error states** – The store provides `isLoading` and `error` fields, so you can show skeletons or error messages.
- **Redirect after creation** – After a workspace is created, the user is redirected to the workspaces list (or the new workspace page) using a client‑side `redirectTo` pattern (avoids cookie race).

### Workspace Page (Dynamic Routing)

- **Slug‑based URLs** – Each workspace has its own page at `/workspace/[slug]`.
- **Server‑side fetch** – The page fetches workspace data on the server using the `slug` parameter, ensuring fast initial load and SEO.
- **Authorization** – The query filters by both `slug` and `owner_id` (or relies on RLS), so users can only see workspaces they own.
- **Not Found handling** – If the workspace does not exist or the user is not authorized, the `notFound()` function shows a clean 404 page.
- **Client‑side navigation** – The workspace list uses Next.js `Link` components for instant, client‑side transitions.

### Projects

- **Create a project** – From any workspace page, click “New Project” to open an inline form. Enter a name and optional description. The slug is auto‑generated from the name. The project is stored in Supabase with the current workspace as its parent.
- **List projects** – The workspace page fetches and displays all projects belonging to that workspace. Each project name is a clickable link to its own page.
- **Security** – RLS policies ensure users can only see and create projects in workspaces they own.
- **Tech stack** – Uses the same pattern as workspaces: axios service → server action → client form (useActionState). Fetching is done on the server (no client‑side store needed).

- **Dynamic routing** – Each project has its own page at `/workspace/[workspaceSlug]/project/[projectSlug]`.
- **Server‑side data fetching** – The page uses both slugs to fetch and validate the project, ensuring it belongs to the correct workspace.
- **Type safety** – Full TypeScript with `Project` interface and `ApiResult<T>` discriminated union for consistent error handling.
- **Placeholder for issues** – The project page currently displays project details (name, description) and is ready to host the issue list and creation form.

**Next step:** Issues (tasks) will be added to the project page, with status, priority, assignee, due date – turning Nexus into a functional task manager.

### Issues

#### Creating an issue
- A form on the project page allows users to create a new issue with:
  - Title (required)
  - Description (optional)
  - Status (`backlog`, `todo`, `in_progress`, `in_review`, `done`)
  - Priority (0–4)
  - Assignee (by username, stored as `assignee_username` text)
  - Due date (optional)
- The form uses `useFormState` (React 18/19 compatible) and passes hidden fields (`projectSlug`, `workspaceSlug`, IDs) to the server action.
- Zustand stores (`workspaceStore`, `projectStore`) hold the current workspace and project, eliminating prop drilling.
- After successful creation, the server action calls `revalidatePath` (to purge the project page cache) and `redirect` – the new issue appears immediately without a manual refresh.

#### Design decisions
- **Assignee as username** – simplifies the UI; users type a username instead of a UUID. (A production version would use a dropdown or user picker.)
- **Hidden inputs** – a simple, reliable way to pass client‑known data (slugs, IDs) to a server action.
- **No extra API calls** – slugs are already available on the client via Zustand stores.
- **Type safety** – full TypeScript with `ApiResult<T>` discriminated union and Zod validation.




## Tech Stack

| Layer       | Technology                            |
| ----------- | ------------------------------------- |
| Framework   | Next.js 15+ (App Router)              |
| Auth API    | Supabase (REST endpoints)             |
| HTTP Client | Axios + native fetch (for middleware) |
| Cookies     | httpOnly (server‑side)                |
| Validation  | `jose` (local JWT verification)       |
| Styling     | Tailwind CSS (your choice)            |

## Architecture Overview
