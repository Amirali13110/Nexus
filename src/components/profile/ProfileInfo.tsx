import { useProfileStore } from "@/store/profileStore";

export default function ProfileInfo() {
  const { profile, error } = useProfileStore();
  return <div>{!error ? profile?.username : error}</div>;
}


