import { signOut } from "@/services/authentication/SignOut";
import { handleSignOut } from "./AuthActions";

export default async function signOutAction(token: string) {
  const result = await signOut(token);
  if (!result.success && result.error) {
    return { success: false, error: result.error };
  }
  handleSignOut();
}
