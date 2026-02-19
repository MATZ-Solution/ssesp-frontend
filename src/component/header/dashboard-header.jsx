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
export default function Header({ onMenuClick }) {
  return (
    <header className="bg-white border-b border-slate-100 px-5 lg:px-8 py-4 flex items-center gap-4 sticky top-0 z-20">
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="text-slate-500 hover:text-slate-800 lg:hidden"
      >
        <MenuIcon size={20} />
      </button>

      <div>
        <h1 className="text-lg font-bold text-slate-800 leading-tight">Dashboard</h1>
        <p className="text-xs text-slate-400">Academic Year 2025–26</p>
      </div>

      <div className="flex-1 hidden sm:block max-w-xs ml-4">
        <div className="relative">
          <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search applications…"
            className="w-full pl-8 pr-4 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-400/40 focus:border-teal-400 transition"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
          <BellIcon size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500 ring-2 ring-white" />
        </button>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold cursor-pointer">
          AK
        </div>
      </div>
    </header>
  );
}
