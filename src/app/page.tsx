import Navbar from "@/components/Navbar";
import StatsCards from "@/components/StatsCards";
import WelcomeCard from "@/components/WelcomeCard";
import WorkspaceSwitcher from "@/components/workspace/WorkspaceSwitcher";

export default function Home() {
  return (
    <div className="">
      <div>
        <Navbar />
        <WelcomeCard />
        <StatsCards />
      </div>
    </div>
  );
}
