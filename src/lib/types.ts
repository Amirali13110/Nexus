// types/supabase.ts
// ==================================================
// SHARED TYPES FOR SUPABASE + SERVER ACTIONS
// ==================================================

// ---------- Generic API Response ----------
export type ApiResult<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

// ---------- Auth Types ----------
export type User = {
  id: string;
  email: string;
  username: string;
  fullname?: string;
  created_at?: string;
  access_token?: string;
};

export type Session = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: User;
};

export type AuthResponse = {
  user: User | null;
  session: Session | null;
  error: { message: string } | null;
};

export type UserCredentials = {
  fullname?: string;
  email: string;
  username?: string;
  password: string;
};

export type ResetPasswordRequest = {
  email: string;
};

export type UpdatePasswordParams = {
  password: string;
  access_token?: string;
};

// ---------- Workspace Types ----------
export type Workspace = {
  id: string;
  slug: string;
  description?: string;
  owner_id: string;
  name: string;
  created_at: string;
};
// ---------- Members ----------

export type Member = {
  id: string;
  email: string;
  bio: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: string;
  joined_at: string;
};

// Input for creating a workspace (if needed)
export type CreateWorkspaceInput = {
  name: string;
  owner_id: string;
};

// ---------- Project Types ----------
// Database shape (what Supabase returns)
export type Project = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  workspace_id: string;
  created_at: string;
  updated_at?: string;
};

// Input for creating a project (what your action accepts)
export type CreateProjectInput = {
  name: string;
  description: string;
  workspace_id: string; // camelCase for frontend
};

// ---------- Profile Types ----------
export type Profile = {
  id: string; // matches auth.users.id
  email: string;
  bio: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

//----------Issue Types----------
export type IssueStatus =
  | "backlog"
  | "in_progress"
  | "in_review"
  | "done"
  | "todo";

export type IssuePriority = 0 | 1 | 2 | 3 | 4;
export type SortField = "due_date" | "created_at" | "priority";
export type SortOrder = "asc" | "desc";
export interface Issue {
  id: string;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: IssuePriority;
  assignee?: {
    id: string;
    username: string;
    full_name?: string;
    email: string;
  };
  assignee_id?: string;
  project_id: string;
  workspace_id: string;
  created_by: string;
  due_date: string | null;
  created_at: string;
  project?: { slug: string };
  workspace?: { slug: string };
  updated_at: string;
}

export interface IssueFilters {
  search?: string;
  status?: string;
  priority?: string;
  assigneeId?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
//------zod-------
export type ZodErrorMessagesType = [
  {
    message: string;
  },
];

//------Invitation-------
export interface Invitation {
  id: string;
  workspace_id: string;
  email: string;
  role: string;
  token: string;
  status: string;
  workspace?: {
    id: string;
    name: string;
    slug: string;
  };
  expires_at: string;
  created_at: string;
  updated_at: string;
}
