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
- **Edit profile** – Users can update their `username`, `full_name`, `bio`, and `avatar_url` via a dedicated profile edit page (`/profile/edit`).
- **Server action** – `updateProfileAction` validates input with Zod, updates the `profiles` table via a PATCH request, and revalidates relevant pages.
- **Real‑time store sync** – After a successful update, the Zustand store (`useProfileStore`) is immediately updated, so the new name appears across the app without a refresh.
- **Security** – Row Level Security (RLS) ensures users can only update their own profile rows (`id = auth.uid()`).
- **User experience** – The form pre‑fills current values, shows loading states, and displays success/error messages.

### Workspaces

- **Create workspace** – Users can create a workspace by providing a name. A URL‑friendly slug is auto‑generated. The workspace is stored in Supabase with the authenticated user as `owner_id`.
- **List workspaces** – Only workspaces owned by the current user are fetched (filtered by `owner_id`). Data is cached server‑side with `unstable_cache` (1 hour) and stored globally in a Zustand store.
- **Global store** – `WorkspaceProvider` (wrapped in the workspace layout) fetches workspaces once and populates the store. Any component can access `useWorkspaceStore().workspaces`.
- **Loading & error states** – The store provides `isLoading` and `error` fields, so you can show skeletons or error messages.
- **Redirect after creation** – After a workspace is created, the user is redirected to the workspaces list (or the new workspace page) using a client‑side `redirectTo` pattern (avoids cookie race).

### Update Workspace

- **Edit workspace details** – Workspace owners can change the `name` and `description` via a dedicated settings page (`/workspace/[slug]/settings`).
- **Auto‑slug sync** – When the name is updated, the `slug` is automatically regenerated using `slugify()`, and the user is redirected to the new URL after saving.
- **Server action** – `updateWorkspaceAction` validates input with Zod, updates the `workspaces` table via a PATCH request, and revalidates both the workspace page and the workspace list.
- **Real‑time store sync** – After a successful update, the Zustand store (`useWorkspaceStore`) is updated, so the new name appears across the app without a refresh.
- **Security** – Row Level Security (RLS) ensures only the workspace owner can update the workspace (`owner_id = auth.uid()`).

### Delete Workspace

- **Owner‑only deletion** – Only the workspace owner can delete the workspace. Row Level Security (RLS) enforces `owner_id = auth.uid()`.
- **Cascade cleanup** – Deleting a workspace automatically removes all related data:
  - Projects and their issues
  - Workspace memberships (`workspace_members`)
  - Pending invitations (`workspace_invitations`)
- **Server action** – `deleteWorkspaceAction` calls the service, revalidates the workspaces list, and redirects to `/workspaces`.
- **Client button** – A simple button with a confirmation dialog (optional) triggers the action and performs a full page reload to ensure the list updates immediately.
- **Data integrity** – Foreign keys are set with `ON DELETE CASCADE` to keep the database clean.

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

### Update & Delete Project

- **Edit project details** – Project owners can change the `name` and `description` via a dedicated settings page (`/workspace/[workspaceSlug]/project/[projectSlug]/settings`).
- **Auto‑slug sync** – When the name is updated, the `slug` is automatically regenerated using `slugify()`, and the user is redirected to the new URL after saving.
- **Server action** – `updateProjectAction` validates input with Zod, updates the `projects` table via a PATCH request, and revalidates the new project page.
- **Delete project** – Removes the project and all its issues (cascade delete). A confirmation dialog prevents accidental deletion.
- **Security** – RLS policies ensure only workspace owners can update or delete projects within their workspaces.

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

#### Fetching and listing issues

- The project page fetches all issues belonging to the current project using `getIssuesByProjectId` service (axios).
- Issues are displayed in a table with columns: **Title**, **Status**, **Priority**, **Assignee**, **Due date**.
- Priority numbers (0–4) are mapped to readable labels: `No priority`, `Urgent`, `High`, `Normal`, `Low`.
- Loading and error states are handled gracefully.

#### Single issue page

- **Dedicated view** – Each issue has its own page at `/workspace/[workspaceSlug]/project/[projectSlug]/issue/[issueId]`.
- **Detailed information** – Displays title, description, status, priority, assignee, due date, creation and last update timestamps.
- **Server‑side fetching** – The page fetches the issue using `getIssueById` service, with full TypeScript support (`ApiResult<Issue>`).
- **Not found handling** – Invalid or missing issues return a 404 page using `notFound()`.
- **Navigation** – From the issue list, each title is a Next.js `<Link>` to the issue page.

### Update & Delete Issue

- **Edit issue** – Workspace members can edit any issue via a dedicated edit page (`/workspace/[ws]/project/[p]/issue/[id]/edit`). The form allows changing title, description, status, priority, assignee, and due date. After saving, the user is redirected to the updated issue page, and the cache is revalidated.
- **Delete issue** – Only the issue creator, workspace owner, or workspace admin can delete an issue. A confirmation dialog prevents accidental deletion. After deletion, the user is redirected to the project page.
- **Server actions** – `updateIssueAction` validates input with Zod, calls the update service, revalidates the issue page, and redirects. `deleteIssueAction` checks permissions via the issue creator and the user's role in the workspace, then calls the delete service and redirects.
- **Service layer** – `updateIssue` and `deleteIssue` use axios to interact with Supabase REST API, handling errors and returning `ApiResult` objects.
- **Client components** – `EditIssueForm` uses `useActionState` for form handling and pending state. `DeleteIssueButton` submits a form action and shows an alert on error.
- **Security** – Row Level Security (RLS) policies on the `issues` table restrict deletion to creators, owners, and admins (optional). The server action also enforces permission checks for added safety.

#### Design decisions

- **Assignee as username** – simplifies the UI; users type a username instead of a UUID. (A production version would use a dropdown or user picker.)
- **Hidden inputs** – a simple, reliable way to pass client‑known data (slugs, IDs) to a server action.
- **No extra API calls** – slugs are already available on the client via Zustand stores.
- **Type safety** – full TypeScript with `ApiResult<T>` discriminated union and Zod validation.

### Workspace Members & Invitations

- **Invite users** – Workspace owners and admins can invite others by email. The system prevents self‑invitation and duplicate pending invitations (unique partial index on `workspace_invitations`).
- **Email delivery** – Resend sends a custom email with an acceptance link containing a unique token (valid 7 days). New users are guided to sign up; existing users see the invitation on their pending page.
- **Pending invitations** – Logged‑in users can view all pending invites at `/workspace/invitations` and accept (become member) or decline.
- **Token‑based acceptance** – The email link (`/invite/accept/[token]`) handles both new and existing users, setting a cookie and redirecting after sign‑up or login.
- **Role‑based access** – Workspace members have roles: `owner`, `admin`, `member`. Only owners and admins can invite new members. The invite form is conditionally rendered based on the user’s role.
- **Membership listing** – The workspace list (`getWorkspaces`) includes workspaces where the user is a member, not only owned ones.
- **Security** – RLS policies on `workspaces` and `workspace_members` enforce that users can only access workspaces they own or are members of. The `workspace_invitations` table has a unique partial index to prevent duplicate pending invitations.

### Member Management (View Only)

- **Members list** – The workspace page (or a dedicated `/workspace/[slug]/members` page) displays all members of the workspace, showing their username, email, and role.
- **Member profile page** – Clicking a member's name navigates to a dedicated page (`/workspace/[slug]/member/[profileId]`) that shows the member's full profile: username, full name, email, bio, avatar, role, and join date.
- **Data fetching** – The member list uses a server component to fetch workspace members with joined profile data. The member profile page fetches the profile and membership role separately (two-step query for reliability).
- **Security** – Only authenticated users with access to the workspace can view the member list and profile pages. RLS policies ensure proper access control.
- **Future enhancements** – Role updates and member removal will be added later.

- **Role update** – Workspace owners and admins can change a member's role (`member` ↔ `admin`). The dropdown shows the current role as a disabled placeholder and offers the other valid roles (owner option only appears for the workspace owner themselves).
- **Delete member** – Owners and admins can remove members from the workspace. The workspace owner cannot be deleted or demoted.
- **Owner protection** – The UI hides the role dropdown for the owner's own row and prevents self‑demotion. Server‑side checks block any attempt to change the owner's role or promote another member to owner.
- **Server actions** – `updateMemberRoleAction` and `deleteMemberAction` enforce permissions and revalidate the members page after successful changes.
- **Client components** – `UpdateMemberForm` uses `useActionState` for form handling, optimistic UI updates, and error display. `DeleteMemberForm` triggers a confirmation dialog before removal.
- **Data fetching** – `getWorkspaceMembers` service fetches both member roles and profile data, merging them into a single `Member` object with `role`, `username`, `email`, etc.

### Search Issues

- **Instant client‑side filtering** – Users can search issues by title or description. As they type, the issue list updates immediately without any network delay or page reload.
- **Simple and fast** – The search term is stored in local component state, not in the URL, ensuring a smooth and responsive user experience.
- **Case‑insensitive** – Search matches text regardless of capitalisation.
- **No extra dependencies** – Uses React `useState` and `useMemo` for efficient filtering.

### Filter & Sort Issues

- **Filter by status** – Backlog, Todo, In Progress, In Review, Done.
- **Filter by priority** – No priority, Urgent, High, Normal, Low.
- **Filter by assignee** – Select any workspace member from the dropdown.
- **Sort options** – Sort issues by **priority**, **due date**, or **created date**, in ascending or descending order.
- **Server‑side execution** – All filters and sorting are applied directly in the database using Supabase queries, ensuring scalability even with thousands of issues.
- **URL persistence** – Filter and sort selections are stored in the URL (`?status=in_progress&sort=priority&order=desc`), making views shareable and bookmarkable.
- **Loading state** – A `loading.tsx` skeleton provides immediate visual feedback during navigation.

### Theming & Form UI

- **Dark / Light mode toggle** – A sliding switch (smooth animation) lets users switch between light and dark themes. The preference is stored in `localStorage` and applied to the whole application via a `dark` class on the `<html>` element. Tailwind’s `dark:` variants handle all colour changes.
- **Consistent form design** – All authentication forms (sign‑up, sign‑in) share a unified look:
  - `FormCard` – centred card with a blue accent line, title, subtitle, and consistent padding/border.
  - `FormInput` – styled input fields with labels, error messages, and dark/light support.
  - `FormButton` – primary blue button with hover effect, loading state, and arrow icon.
- **Responsive** – The card scales from mobile (full width, 1rem padding) to desktop (max‑width 32rem, larger padding). Inputs switch to a two‑column layout on larger screens.
- **Background decoration** – A subtle radial pattern and blurred blue circles create depth, visible only on authentication pages. The opacity is reduced in dark mode.
- **Accessibility** – Focus states are clearly visible, buttons and inputs have appropriate `disabled` styles, and labels are properly associated with inputs.
- **Password visibility toggles** – Clean SVG eye icons (open / closed) replace emojis, matching the overall aesthetic.

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

```

```

```

```
