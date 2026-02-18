import {

  TrendingUpIcon,
  TrendingDownIcon,
 
} from "lucide-react";

export default function StatCard({ label, value, change, up, color, icon: Icon, sub }) {
  const colors = {
    green: { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600" },
    blue:  { bg: "bg-blue-500",    light: "bg-blue-50",    text: "text-blue-600" },
    amber: { bg: "bg-amber-500",   light: "bg-amber-50",   text: "text-amber-600" },
    teal:  { bg: "bg-teal-500",    light: "bg-teal-50",    text: "text-teal-600" },
  };
  const c = colors[color] || colors.teal;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <div className={`${c.light} ${c.text} p-2 rounded-xl`}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800 tracking-tight">
          {value.toLocaleString()}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <span className={`flex items-center gap-0.5 text-xs font-semibold ${up ? "text-emerald-600" : "text-red-500"}`}>
            {up ? <TrendingUpIcon size={12} /> : <TrendingDownIcon size={12} />}
            {change}
          </span>
          <span className="text-xs text-slate-400">{sub}</span>
        </div>
      </div>
    </div>
  );
}

