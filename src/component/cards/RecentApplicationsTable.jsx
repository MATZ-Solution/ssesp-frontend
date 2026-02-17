import ApplicationRow from './ApplicationRow';
import {
  GridIcon,
  FileIcon,
  FileTextIcon,
  CheckCircle2Icon,
  ClockIcon,
  UsersIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  BellIcon,
  SearchIcon,
  ChevronRightIcon,
  BarChart2Icon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  ArrowUpRightIcon,
} from "lucide-react";

const statusStyles = {
  approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  pending:  "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  rejected: "bg-red-50 text-red-700 ring-1 ring-red-200",
};
function RecentApplicationsTable({ applications }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-5">
      <div className="flex items-center justify-between p-5 border-b border-slate-100">
        <h3 className="font-semibold text-slate-800">Recent Applications</h3>
        <button className="flex items-center gap-1 text-xs text-teal-600 font-medium hover:underline">
          View all <ChevronRightIcon size={12} />
        </button>
      </div>
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-medium uppercase tracking-wider">
              <th className="text-left px-5 py-3">Application ID</th>
              <th className="text-left px-5 py-3">Name</th>
              <th className="text-left px-5 py-3">Grade</th>
              <th className="text-left px-5 py-3">School Type</th>
              <th className="text-left px-5 py-3">Date</th>
              <th className="text-left px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {applications.map((app, i) => (
              <tr key={app.id} className={`border-t border-slate-50 hover:bg-slate-50/70 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                <td className="px-5 py-3.5 font-mono text-xs text-slate-600">{app.id}</td>
                <td className="px-5 py-3.5 font-medium text-slate-800">{app.name}</td>
                <td className="px-5 py-3.5 text-slate-600">{app.grade}</td>
                <td className="px-5 py-3.5 text-slate-600">{app.schoolType}</td>
                <td className="px-5 py-3.5 text-slate-500 text-xs">{app.date}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[app.status]}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button className="text-slate-400 hover:text-teal-600 transition-colors">
                    <ArrowUpRightIcon size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile card list */}
      <div className="md:hidden divide-y divide-slate-100">
        {applications.map((app) => (
          <div key={app.id} className="p-4 flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-slate-800 text-sm">{app.name}</p>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{app.id}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{app.grade}</span>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{app.schoolType}</span>
                <span className="text-xs text-slate-400">{app.date}</span>
              </div>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 ${statusStyles[app.status]}`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentApplicationsTable;