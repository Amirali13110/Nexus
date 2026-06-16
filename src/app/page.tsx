import IssueStatusChart from "@/components/issue/IssueStatusChart";
import RecentIssues from "@/components/issue/RecentIssues";
import Navbar from "@/components/ui/Navbar";
import StatsCards from "@/components/ui/StatsCards";
import WelcomeCard from "@/components/ui/WelcomeCard";
import WorkspaceCards from "@/components/workspace/WorkspaceCards";
import WorkspaceSwitcher from "@/components/workspace/WorkspaceSwitcher";

export default function Home() {
  return (


    <div className="">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 pt-20 md:px-8">
        <WelcomeCard />

        <div className="mt-6">
          <StatsCards />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Your Workspaces
          </h2>
          <WorkspaceCards />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RecentIssues />
          <IssueStatusChart />
        </div>
      </div>
    </div>
  );
}
