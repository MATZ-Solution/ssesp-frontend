
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
  SchoolIcon,
} from "lucide-react";

const navItems = [
  { id: 'dashboard', icon: GridIcon, label: 'Dashboard' },
  { id: 'applications', icon: FileIcon, label: 'Applications' },
  { id: 'students', icon: UsersIcon, label: 'Students' },
  { id: 'schools', icon: SchoolIcon, label: 'Schools' },
  { id: 'reports', icon: FileTextIcon, label: 'Reports' },
  { id: 'settings', icon: SettingsIcon, label: 'Settings' },
];

function Sidebar({ activeNav, setActiveNav, open, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 w-64 bg-slate-900 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <span className="text-white text-xs font-black">S</span>
              </div>
              <span className="font-bold text-white tracking-tight">SSESP</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-0.5 ml-9">Admin Portal</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white lg:hidden">
            <XIcon size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => { setActiveNav(id); onClose?.(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                activeNav === id
                  ? "bg-teal-500/15 text-teal-400 shadow-inner"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon size={16} />
              {label}
              {activeNav === id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400" />
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-800 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Admin Khan</p>
              <p className="text-xs text-slate-400 truncate">admin@ssesp.gov.pk</p>
            </div>
            <LogOutIcon size={14} className="text-slate-500 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;