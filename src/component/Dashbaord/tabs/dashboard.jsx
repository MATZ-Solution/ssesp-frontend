import { useState } from "react";
import {
  FileTextIcon,
  CheckCircle2Icon,
  ClockIcon,
  UsersIcon,
} from "lucide-react";
import Header from "../../header/dashboard-header";
import StatCard from "../../cards/stats-card-dashboard";
import ApplicationsByGrade from "../../charts/application-by-grade";
import MonthlyTrendsChart from "../../charts/monthly-trends";
import Sidebar from "../sidebar";
import RecentApplicationsTable from "../../cards/RecentApplicationsTable";
import QuickActions from "../QuickActions";
import SessionOverview from "../SessionOverview";
import { useGetDashbaordData, useGetDashbaordApplicantRecentData } from "../../../../api/client/admin"


export default function Dashboard() {

  const { data, isSuccess, isPending, isError, isLoading } = useGetDashbaordData()
  const { data: applicantData, isLoading: applicantIsLoading } = useGetDashbaordApplicantRecentData()

  return (
    <div
      className="flex min-h-screen "
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >

      <main className="flex-1 min-w-0 overflow-auto flex flex-col">

        <div className="">
          {/* ── Stat Cards ── */}
          {isLoading ? <p>Loading...</p> :
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              <StatCard
                label="Total Applications"
                value={data[0]?.total_application || 'N/A'}
                change="+23%"
                up={true}
                color="green"
                icon={FileTextIcon}
                sub="vs last month"
              />
              <StatCard
                label="Total Completed Applications"
                value={data[0]?.total_completed_application || 'N/A'}
                change="+18%"
                up={true}
                color="blue"
                icon={CheckCircle2Icon}
                // sub={`${approvalRate}% approval rate`}
              />
              <StatCard
                label="Male Applications"
                value={data[0]?.total_male_application || 'N/A'}
                change="-4%"
                up={false}
                color="amber"
                icon={ClockIcon}
                sub="needs attention"
              />
              <StatCard
                label="Female Applications"
                value={data[0]?.total_female_application || 'N/A'}
                change="+31%"
                up={true}
                color="teal"
                icon={UsersIcon}
                // sub={`${enrollmentRate}% of approved`}
              />
            </div>
          }

          {/* ── Charts ── */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ApplicationsByGrade data={gradeData} />
            <MonthlyTrendsChart data={monthlyData} />
          </div> */}

          {/* ── Table ── */}
          <div className="mt-10">
            {applicantIsLoading ? <p>Loading...</p> :
              <RecentApplicationsTable applications={applicantData} />
            }
          </div>

          {/* ── Bottom Row ── */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3">
              <QuickActions />
            </div>
            <div className="lg:col-span-2">
              <SessionOverview
                approvalRate={approvalRate}
                enrollmentRate={enrollmentRate}
                pendingPercentage={pendingPct}
              />
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}