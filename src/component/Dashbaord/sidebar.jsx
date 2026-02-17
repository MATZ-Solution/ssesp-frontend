import { useState } from "react";
import {
  LayoutGrid, FileText, Users, School,
  BarChart3, Settings, Menu, X, ChevronRight, Bell, LogOut,
} from "lucide-react";

const navItems = [
  { id: "dashboard",    icon: LayoutGrid, label: "Dashboard" },
  { id: "applications", icon: FileText,   label: "Applications", badge: 892 },
  { id: "students",     icon: Users,      label: "Students" },
  { id: "schools",      icon: School,     label: "Schools" },
  { id: "reports",      icon: BarChart3,  label: "Reports" },
  { id: "settings",     icon: Settings,   label: "Settings" },
];

const statMap = {
  dashboard:    [{ l: "Active Students", v: "14,832", s: "Enrolled this year" }, { l: "Schools",  v: "403",   s: "Registered", g: true }, { l: "Applications", v: "892", s: "Pending review" }],
  applications: [{ l: "Submitted",       v: "892",    s: "Awaiting action", g: true }, { l: "Approved", v: "6,210", s: "This cycle" }, { l: "Rejected", v: "138", s: "Ineligible" }],
  students:     [{ l: "Total Students",  v: "14,832", s: "Active" }, { l: "Female", v: "7,641", s: "51.5%" }, { l: "Male", v: "7,191", s: "48.5%" }],
  schools:      [{ l: "Registered",      v: "403",    s: "Public + Private" }, { l: "Rural", v: "261", s: "64.8%", g: true }, { l: "Urban", v: "142", s: "35.2%" }],
  reports:      [{ l: "Generated",       v: "28",     s: "This month" }, { l: "Exports", v: "74", s: "CSV / PDF" }, { l: "Scheduled", v: "6", s: "Upcoming", g: true }],
  settings:     [{ l: "System Version",  v: "3.1",    s: "Stable", g: true }, { l: "Users", v: "12", s: "Admin accounts" }, { l: "Last Backup", v: "2h", s: "ago" }],
};

function Sidebar({ activeNav, setActiveNav, isOpen, setIsOpen }) {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-screen w-64 flex flex-col
        lg:static lg:z-auto lg:translate-x-0
        transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      style={{ background: "#0f1117", borderRight: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Green accent stripe */}
      <div
        className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
        style={{ height: 2.5, background: "linear-gradient(90deg,#22c55e,#16a34a,#15803d)" }}
      />

      {/* Ambient glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{ top: -80, left: -80, width: 260, height: 260, background: "radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 70%)" }}
      />

      {/* Mobile close */}
      <div className="flex justify-end p-4 lg:hidden">
        <button
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-all"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <X size={15} color="rgba(255,255,255,0.6)" />
        </button>
      </div>

      {/* Logo */}
      <div className="px-6 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center flex-shrink-0 rounded-lg"
            style={{ width: 34, height: 34, background: "linear-gradient(135deg,#22c55e,#15803d)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide" style={{ color: "#f1f5f9" }}>SSESP</p>
            <p className="uppercase tracking-widest mt-0.5" style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "monospace" }}>Admin Portal</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 pt-5 pb-3" style={{ scrollbarWidth: "none" }}>
        <p className="px-2 mb-2 uppercase tracking-widest font-medium" style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>
          Main Menu
        </p>

        <div className="flex flex-col gap-0.5">
          {navItems.map(({ id, icon: Icon, label, badge }) => {
            const active = activeNav === id;
            return (
              <button
                key={id}
                onClick={() => { setActiveNav(id); setIsOpen(false); }}
                className="relative flex items-center gap-2.5 w-full text-left px-2.5 py-2 rounded-lg text-sm transition-all"
                style={{
                  background: active ? "rgba(34,197,94,0.11)" : "transparent",
                  color:      active ? "#4ade80" : "rgba(255,255,255,0.42)",
                  fontWeight: active ? 500 : 400,
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.72)";
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(255,255,255,0.42)";
                  }
                }}
              >
                {/* Active indicator bar */}
                {active && (
                  <span
                    className="absolute left-0 rounded-r"
                    style={{ top: "22%", bottom: "22%", width: 2.5, background: "#22c55e" }}
                  />
                )}

                {/* Icon bubble */}
                <span
                  className="flex items-center justify-center flex-shrink-0 rounded-md"
                  style={{
                    width: 30, height: 30,
                    background: active ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.0)",
                    transition: "background .15s",
                  }}
                >
                  <Icon size={15} strokeWidth={1.75} />
                </span>

                <span className="flex-1">{label}</span>

                {badge ? (
                  <span
                    className="rounded-full px-1.5 py-0.5"
                    style={{
                      fontSize: 10, fontFamily: "monospace", fontWeight: 600,
                      background: "rgba(239,68,68,0.13)", color: "#f87171",
                      border: "1px solid rgba(239,68,68,0.18)",
                    }}
                  >
                    {badge.toLocaleString()}
                  </span>
                ) : (
                  <ChevronRight size={12} style={{ opacity: 0.18 }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-3 mx-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />

        {/* Notification hint */}
        <div
          className="flex items-start gap-2 mx-1 p-3 rounded-lg cursor-pointer transition-all"
          style={{ background: "rgba(234,179,8,0.06)", border: "1px solid rgba(234,179,8,0.13)" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(234,179,8,0.11)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(234,179,8,0.06)"}
        >
          <Bell size={13} className="flex-shrink-0 mt-0.5" style={{ color: "#ca8a04" }} />
          <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.38)", lineHeight: 1.55 }}>
            <span className="block font-medium" style={{ color: "rgba(255,255,255,0.62)", marginBottom: 2 }}>
              3 pending reviews
            </span>
            Scholarship approvals awaiting action
          </div>
        </div>
      </nav>

      {/* Profile */}
      <div className="p-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-pointer transition-all"
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <div
            className="flex items-center justify-center flex-shrink-0 rounded-lg text-white font-bold"
            style={{ width: 34, height: 34, fontSize: 12, background: "linear-gradient(135deg,#22c55e,#15803d)" }}
          >
            AO
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "rgba(255,255,255,0.78)" }}>Admin Officer</p>
            <p className="truncate mt-0.5" style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "monospace" }}>Gov. Sindh · SEF</p>
          </div>
          <LogOut size={13} style={{ color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
        </div>
      </div>
    </aside>
  );
}

/* ─── App Shell ────────────────────────────────────────────────────────────── */
export default function App() {
  const [activeNav, setActiveNav]     = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeItem = navItems.find(n => n.id === activeNav);
  const stats      = statMap[activeNav] ?? statMap.dashboard;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#FFFFFF", fontFamily: "system-ui, sans-serif" }}>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Topbar */}
        <header
          className="flex items-center justify-between px-5 lg:px-8 flex-shrink-0"
          style={{ height: 60, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-3">
            {/* Hamburger – mobile only */}
            <button
              className="flex lg:hidden items-center justify-center rounded-lg transition-all"
              style={{ width: 36, height: 36, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.09)" }}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={17} color="rgba(255,255,255,0.65)" />
            </button>
            <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.68)" }}>
              {activeItem?.label}
            </span>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)", fontFamily: "monospace", letterSpacing: "0.06em" }}>
            TUE 17 FEB 2026
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-8">
          <p className="uppercase tracking-widest mb-1" style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", fontFamily: "monospace" }}>Overview</p>
          <h1 className="text-xl font-semibold mb-6" style={{ color: "rgba(255,255,255,0.82)" }}>{activeItem?.label}</h1>

          {/* Stat cards — responsive grid */}
          <div className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(175px,1fr))" }}>
            {stats.map(({ l, v, s, g }) => (
              <div key={l} className="rounded-xl p-5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <p className="uppercase tracking-widest mb-2" style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", fontFamily: "monospace" }}>{l}</p>
                <p className="text-3xl font-semibold leading-none" style={{ color: g ? "#4ade80" : "rgba(255,255,255,0.82)" }}>{v}</p>
                <p className="mt-1.5" style={{ fontSize: 11.5, color: "rgba(255,255,255,0.28)" }}>{s}</p>
              </div>
            ))}
          </div>

          {/* Activity list */}
          <div className="mt-6 rounded-xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm font-medium mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>Recent Activity</p>
            <div className="flex flex-col gap-3">
              {[
                { text: "Application #4821 submitted — Fatima Malik, Karachi",      dot: true },
                { text: "School registration updated — Govt. High School, Larkana", dot: false },
                { text: "Report generated — Q4 2025 Scholarship Summary",           dot: false },
                { text: "Application #4820 approved — Ali Hassan, Hyderabad",       dot: false },
              ].map(({ text, dot }, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 rounded-full"
                    style={{ width: 6, height: 6, background: dot ? "#4ade80" : "rgba(255,255,255,0.14)" }}
                  />
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}