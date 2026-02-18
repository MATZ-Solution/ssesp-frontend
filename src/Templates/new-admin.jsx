import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "../component/Dashbaord/sidebar";

function NewAdminTemplate({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-100">
      
      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 top-0 left-0 h-full transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <Sidebar />
      </div>

      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between bg-white shadow-sm px-6 py-4">
          <div className="flex items-center gap-3">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu size={22} />
            </button>

            <h1 className="text-xl font-semibold text-gray-700">
              Admin Dashboard
            </h1>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Admin</span>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export default NewAdminTemplate;
