import { ClockIcon, FileTextIcon,UsersIcon,BarChart2Icon } from 'lucide-react';
import React from 'react';

function QuickActions() {

    const quickActions = [
      { label: "Review Pending", icon: ClockIcon, color: "bg-amber-50 text-amber-600 border-amber-100" },
      { label: "Export Report", icon: FileTextIcon, color: "bg-blue-50 text-blue-600 border-blue-100" },
      { label: "Add Student", icon: UsersIcon, color: "bg-teal-50 text-teal-600 border-teal-100" },
      { label: "View Analytics", icon: BarChart2Icon, color: "bg-violet-50 text-violet-600 border-violet-100" },
    ];
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
      <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions.map(({ label, icon: Icon, color }) => (
          <button
            key={label}
            className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium ${color} hover:opacity-80 transition-opacity text-left`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}


export default QuickActions;