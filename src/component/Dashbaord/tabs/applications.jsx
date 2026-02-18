import { CheckCircle, Clock, Filter, Users, XCircle } from "lucide-react";
import React from "react";
import RecentApplicationsTable from "../../cards/RecentApplicationsTable";

const Applications = () => {


const MOCK_APPLICATIONS = [
  { id: "APP-2401", name: "Sofia Reyes", grade: "Grade 9", schoolType: "Public", date: "Feb 14, 2025", status: "approved" },
  { id: "APP-2402", name: "Marcus Chen", grade: "Grade 7", schoolType: "Private", date: "Feb 13, 2025", status: "pending" },
  { id: "APP-2403", name: "Aisha Patel", grade: "Grade 11", schoolType: "Charter", date: "Feb 12, 2025", status: "approved" },
  { id: "APP-2404", name: "Elijah Torres", grade: "Grade 5", schoolType: "Public", date: "Feb 12, 2025", status: "rejected" },
  { id: "APP-2405", name: "Lily Nakamura", grade: "Grade 8", schoolType: "Magnet", date: "Feb 11, 2025", status: "pending" },
  { id: "APP-2406", name: "Owen Fitzgerald", grade: "Grade 10", schoolType: "Private", date: "Feb 11, 2025", status: "approved" },
  { id: "APP-2407", name: "Zara Ahmed", grade: "Grade 6", schoolType: "Public", date: "Feb 10, 2025", status: "pending" },
  { id: "APP-2408", name: "Noah Williams", grade: "Grade 12", schoolType: "Charter", date: "Feb 10, 2025", status: "approved" },
  { id: "APP-2409", name: "Imani Jackson", grade: "Grade 9", schoolType: "Magnet", date: "Feb 09, 2025", status: "rejected" },
  { id: "APP-2410", name: "Lucas Moreau", grade: "Grade 7", schoolType: "Private", date: "Feb 09, 2025", status: "approved" },
  { id: "APP-2411", name: "Priya Singh", grade: "Grade 11", schoolType: "Public", date: "Feb 08, 2025", status: "pending" },
  { id: "APP-2412", name: "James O'Brien", grade: "Grade 5", schoolType: "Charter", date: "Feb 08, 2025", status: "approved" },
];

const STATS = [
  { label: "Total Applications", value: "1,284", change: "+12%", up: true, icon: Users, color: "from-violet-500 to-purple-600" },
  { label: "Approved", value: "847", change: "+8%", up: true, icon: CheckCircle, color: "from-emerald-400 to-teal-500" },
  { label: "Pending Review", value: "312", change: "+24%", up: true, icon: Clock, color: "from-amber-400 to-orange-500" },
  { label: "Rejected", value: "125", change: "-3%", up: false, icon: XCircle, color: "from-rose-400 to-red-500" },
];
  return (
    <div>
      {" "}
      <main className="flex-1 p-5 md:p-7 space-y-6">
        {/* Welcome */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Good morning, Admin 👋
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Here's what's happening with applications today.
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 bg-teal-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-teal-700 transition-colors shadow-sm">
            <Filter size={14} />
            Export Report
          </button>
        </div>

        {/* Stat cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div> */}

        {/* Table */}
        <RecentApplicationsTable applications={MOCK_APPLICATIONS} />
      </main>
    </div>
  );
};

export default Applications;
