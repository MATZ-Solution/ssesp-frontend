import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { title: "Applications", icon: FileText, path: "/admin/applications" },
];

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-50 text-gray-800 flex flex-col shadow-lg">
      
      {/* Logo */}
      <div className="p-6 text-2xl font-extrabold border-b border-gray-200 text-green-600">
        Admin Panel
      </div>

      {/* Menu */}
      <ul className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 p-3 rounded-xl transition-all duration-300
                ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                    : "hover:bg-green-100 text-gray-700 hover:text-green-600"
                }`
              }
            >
              <item.icon size={22} className="flex-shrink-0" />
              <span className="font-medium text-md">{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
