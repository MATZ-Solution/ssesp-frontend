import React, { useState } from "react";
import { LogOut, Menu, X, GraduationCap, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(removeUser())
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 via-green-600 to-green-800 shadow-2xl sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-white font-bold text-xl tracking-wide">
                SSESP Portal
              </h1>
              <p className="text-white/80 text-xs">
                Sindh Education Foundation
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <div className="bg-white/30 p-1.5 rounded-full">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium">
                Student Portal
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-2 bg-white/10 hover:bg-red-500 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <LogOut className="h-4 w-4 text-white group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-white text-sm font-medium">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-green-600 to-green-700 border-t border-white/10 shadow-2xl">
          <div className="px-4 pt-2 pb-4 space-y-3">
            {/* Mobile Brand */}
            <div className="py-3 border-b border-white/10">
              <h2 className="text-white font-bold text-lg">SSESP Portal</h2>
              <p className="text-white/80 text-sm">
                Sindh Education Foundation
              </p>
            </div>

            {/* Mobile User Info */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20">
              <div className="bg-white/30 p-2 rounded-full">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Student Portal</p>
                <p className="text-white/70 text-xs">Active Session</p>
              </div>
            </div>

            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl transition-all duration-300 shadow-lg"
            >
              <LogOut className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;