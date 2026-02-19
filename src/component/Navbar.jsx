import React, { useState } from "react";
import { LogOut, Menu, X, GraduationCap, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auto-hide navbar on scroll (mobile only)
  React.useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Only apply auto-hide on mobile/tablet screens
      if (window.innerWidth < 1024) {
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          // Scrolling down & past threshold
          setIsVisible(false);
          setIsMenuOpen(false); // Close menu when hiding
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        // Always visible on desktop
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(removeUser());
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className={`rounded-lg bg-gradient-to-r from-green-700 via-green-600 to-green-800 shadow-2xl sticky top-0 z-50 backdrop-blur-lg w-full transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="w-full px-3 sm:px-4 md:px-6 lg:max-w-7xl lg:mx-auto">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1 md:flex-initial">
            <div className="bg-white/20 backdrop-blur-md p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg flex-shrink-0">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <div className="min-w-0 flex-1 md:flex-initial">
              <h1 className="text-white font-bold text-sm sm:text-base md:text-xl tracking-wide truncate">
                SSESP Portal
              </h1>
              <p className="text-white/80 text-xs hidden sm:block truncate">
                Sindh Education Foundation
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            {/* User Info */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 xl:px-4 py-2 rounded-full border border-white/20">
              <div className="bg-white/30 p-1.5 rounded-full">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">
                Student Portal
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-2 bg-white/10 hover:bg-red-500 backdrop-blur-md px-3 xl:px-4 py-2 rounded-full border border-white/20 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <LogOut className="h-4 w-4 text-white group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-white text-sm font-medium whitespace-nowrap">
                Logout
              </span>
            </button>
          </div>

          {/* Tablet Logout Button (visible between md and lg) */}
          <div className="hidden md:flex lg:hidden">
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-2 bg-white/10 hover:bg-red-500 backdrop-blur-md px-3 py-2 rounded-full border border-white/20 hover:border-red-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              title="Logout"
            >
              <LogOut className="h-4 w-4 text-white group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-white text-sm font-medium">Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex-shrink-0 ml-2">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-200 active:scale-95"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-green-600 to-green-700 border-t border-white/10 shadow-2xl animate-fade-in">
          <div className="px-3 sm:px-4 pt-2 pb-4 space-y-3">
            {/* Mobile Brand (only show on very small screens) */}
            <div className="py-2 sm:py-3 border-b border-white/10 sm:hidden">
              <h2 className="text-white font-bold text-base">SSESP Portal</h2>
              <p className="text-white/80 text-sm">
                Sindh Education Foundation
              </p>
            </div>

            {/* Mobile User Info */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-3 rounded-xl border border-white/20">
              <div className="bg-white/30 p-2 rounded-full flex-shrink-0">
                <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white text-sm font-medium">Student Portal</p>
                <p className="text-white/70 text-xs">Active Session</p>
              </div>
            </div>

            {/* Mobile Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 hover:bg-red-600 active:bg-red-700 px-4 py-3 rounded-xl transition-all duration-300 shadow-lg active:scale-98"
            >
              <LogOut className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              <span className="text-white font-medium text-sm sm:text-base">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;