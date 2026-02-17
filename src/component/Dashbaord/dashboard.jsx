import { useState } from "react";
import {
 
  FileTextIcon,
  CheckCircle2Icon,
  ClockIcon,
  UsersIcon,

} from "lucide-react";
import Header from "../header/dashboard-header";
import StatCard from "../cards/stats-card-dashboard";
import ApplicationsByGrade from "../charts/application-by-grade";
import MonthlyTrendsChart from "../charts/monthly-trends";
import Sidebar from "./sidebar";
import RecentApplicationsTable from "../cards/RecentApplicationsTable";
import QuickActions from "./QuickActions";
import SessionOverview from "./SessionOverview";

const stats = {
  totalApplications: 2847,
  approved: 1523,
  pending: 892,
  enrolled: 1468,
};

const recentApplications = [
  {
    id: "#SSESP-2847",
    name: "Ahmed Ali Khan",
    grade: "Grade 9",
    schoolType: "Government",
    date: "Feb 10, 2026",
    status: "pending",
  },
  {
    id: "#SSESP-2846",
    name: "Fatima Zahra",
    grade: "Grade 6",
    schoolType: "Private",
    date: "Feb 10, 2026",
    status: "approved",
  },
  {
    id: "#SSESP-2845",
    name: "Muhammad Bilal",
    grade: "Grade 8",
    schoolType: "Government",
    date: "Feb 09, 2026",
    status: "approved",
  },
  {
    id: "#SSESP-2844",
    name: "Sara Qureshi",
    grade: "Grade 7",
    schoolType: "Semi-Govt",
    date: "Feb 09, 2026",
    status: "pending",
  },
  {
    id: "#SSESP-2843",
    name: "Usman Tariq",
    grade: "Grade 10",
    schoolType: "Private",
    date: "Feb 08, 2026",
    status: "rejected",
  },
  {
    id: "#SSESP-2842",
    name: "Nida Hussain",
    grade: "Grade 6",
    schoolType: "Government",
    date: "Feb 08, 2026",
    status: "approved",
  },
];

const gradeData = [
  { grade: "Grade 6", count: 612, pct: 72 },
  { grade: "Grade 7", count: 540, pct: 63 },
  { grade: "Grade 8", count: 498, pct: 58 },
  { grade: "Grade 9", count: 720, pct: 85 },
  { grade: "Grade 10", count: 477, pct: 56 },
];

const monthlyData = [
  { month: "Sep", apps: 210 },
  { month: "Oct", apps: 320 },
  { month: "Nov", apps: 280 },
  { month: "Dec", apps: 180 },
  { month: "Jan", apps: 410 },
  { month: "Feb", apps: 390 },
  { month: "Mar", apps: 520 },
  { month: "Apr", apps: 470 },
];

const approvalRate = Math.round(
  (stats.approved / stats.totalApplications) * 100,
);
const enrollmentRate = Math.round((stats.enrolled / stats.approved) * 100);
const pendingPct = Math.round((stats.pending / stats.totalApplications) * 100);



export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen bg-slate-50"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 min-w-0 overflow-auto flex flex-col">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-4 sm:p-6 lg:p-8 space-y-5 flex-1">
          {/* ── Stat Cards ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            <StatCard
              label="Total Applications"
              value={stats.totalApplications}
              change="+23%"
              up={true}
              color="green"
              icon={FileTextIcon}
              sub="vs last month"
            />
            <StatCard
              label="Approved"
              value={stats.approved}
              change="+18%"
              up={true}
              color="blue"
              icon={CheckCircle2Icon}
              sub={`${approvalRate}% approval rate`}
            />
            <StatCard
              label="Pending Review"
              value={stats.pending}
              change="-4%"
              up={false}
              color="amber"
              icon={ClockIcon}
              sub="needs attention"
            />
            <StatCard
              label="Enrolled"
              value={stats.enrolled}
              change="+31%"
              up={true}
              color="teal"
              icon={UsersIcon}
              sub={`${enrollmentRate}% of approved`}
            />
          </div>

          {/* ── Charts ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ApplicationsByGrade data={gradeData} />
            <MonthlyTrendsChart data={monthlyData} />
          </div>

          {/* ── Table ── */}
          <RecentApplicationsTable applications={recentApplications} />

          {/* ── Bottom Row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
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
          </div>
        </div>
      </main>
    </div>
  );
}
