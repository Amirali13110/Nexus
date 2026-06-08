import { useProfileStore } from "@/store/profileStore";

export default function ProfileInfo() {
  const { profile, error } = useProfileStore();
  return <div>{!error ? profile?.full_name || profile?.username : error}</div>;
}
