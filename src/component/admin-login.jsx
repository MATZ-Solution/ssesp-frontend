import { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../assets/govt-log.jpeg";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import * as yup from "yup";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  CheckCircle,
  BarChart3,
  Users,
  Settings,
  Database,
  Key,
  AlertTriangle,
  Zap,
  Activity,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./button";
import { useAdminLogin } from '../../api/client/admin';

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const adminLoginSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Please enter a valid email address"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminLoginSchema),
    mode: "onChange",
  });

  const { adminLogin, isPending, isError, error } = useAdminLogin();

  const onSubmit = async (data) => {
    adminLogin(data);
  };

  const floatingElements = [
    { Icon: Shield,     delay: 0,  duration: 20, size: 22, color: "#4BA54F" },
    { Icon: Database,   delay: 2,  duration: 25, size: 26, color: "#22c55e" },
    { Icon: Key,        delay: 4,  duration: 22, size: 24, color: "#4BA54F" },
    { Icon: Settings,   delay: 6,  duration: 24, size: 28, color: "#16a34a" },
    { Icon: Users,      delay: 8,  duration: 23, size: 26, color: "#4BA54F" },
    { Icon: BarChart3,  delay: 10, duration: 21, size: 24, color: "#22c55e" },
    { Icon: Zap,        delay: 12, duration: 26, size: 26, color: "#4BA54F" },
    { Icon: Activity,   delay: 14, duration: 24, size: 22, color: "#16a34a" },
    { Icon: TrendingUp, delay: 16, duration: 22, size: 20, color: "#4BA54F" },
    { Icon: Lock,       delay: 18, duration: 25, size: 24, color: "#22c55e" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">

      {/* Soft background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-green-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-100/50 rounded-full blur-3xl" />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "radial-gradient(circle, #4BA54F22 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Floating icons */}
      {floatingElements.map(({ Icon, delay, duration, size, color }, i) => (
        <div
          key={i}
          className="absolute pointer-events-none opacity-10"
          style={{
            left: `${(i * 10) % 100}%`,
            top: `${(i * 15) % 100}%`,
            animation: `floatAnim ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon size={size} color={color} />
        </div>
      ))}

      {/* ── Page layout ── */}
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">

        {/* ── LEFT PANEL (desktop only) ── */}
        <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 flex-col justify-between p-10 xl:p-14">

          {/* Top: logo + title */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <img
                src={logo}
                alt="Logo"
                className="w-14 h-14 rounded-xl object-cover shadow-md border-2 border-green-200"
              />
              <div>
                <p className="text-xs font-bold text-[#4BA54F] tracking-widest uppercase">
                  SSESP Admin Panel
                </p>
                <p className="text-xs text-gray-400 mt-0.5">Restricted Access</p>
              </div>
            </div>

            <h1 className="text-3xl xl:text-4xl font-extrabold text-gray-800 leading-tight">
              SINDH EDUCATION
              <br />
              FOUNDATION
            </h1>
            <span className="block mt-1 text-2xl xl:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4BA54F] to-emerald-500">
              ADMIN DASHBOARD
            </span>

            <div className="mt-5 space-y-1">
              <p className="text-base font-semibold text-[#4BA54F]">Administrator Portal</p>
              <p className="text-sm text-gray-500">Session 2026-27</p>
              <p className="text-sm text-gray-400 max-w-xs mt-2">
                Authorized personnel only. All activities are monitored and logged.
              </p>
            </div>
          </div>

          {/* Middle: feature cards */}
          <div className="grid grid-cols-2 gap-3 my-8">
            {[
              { icon: Users,    label: "Manage Applicants", desc: "View & update applicant records" },
              { icon: BarChart3,label: "View Reports",      desc: "Analytics & summaries"           },
              { icon: Database, label: "Data Management",   desc: "Export & manage data"            },
              { icon: Settings, label: "System Settings",   desc: "Configure portal settings"       },
            ].map((f, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-green-100 shadow-sm hover:shadow-md hover:border-green-300 transition-all duration-300 group"
              >
                <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <f.icon size={18} className="text-[#4BA54F]" />
                </div>
                <p className="text-sm font-semibold text-gray-700">{f.label}</p>
                <p className="text-xs text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom: branding */}
          <p className="text-xs text-gray-400">
            Powered by{" "}
            <span className="text-[#4BA54F] font-semibold">Matz Solution's Pvt ltd</span>
          </p>
        </div>

        {/* ── RIGHT PANEL – Form ── */}
        <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col items-center justify-center px-4 py-10 sm:px-8 lg:px-12">

          {/* Mobile header */}
          <div className="lg:hidden flex flex-col items-center text-center mb-8 w-full">
            <img
              src={logo}
              alt="Logo"
              className="w-16 h-16 rounded-xl object-cover shadow-md border-2 border-green-200 mb-3"
            />
            <h1 className="text-xl font-extrabold text-gray-800">
              SINDH EDUCATION FOUNDATION
            </h1>
            <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4BA54F] to-emerald-500">
              ADMIN DASHBOARD
            </span>
            <p className="text-sm font-semibold text-[#4BA54F] mt-1">Administrator Portal</p>
            <p className="text-xs text-gray-400">Session 2026-27</p>
          </div>

          {/* Card */}
          <div className="w-full max-w-md">
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4BA54F] to-emerald-400 rounded-3xl blur-xl opacity-10 pointer-events-none" />

            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border border-green-100 shadow-xl shadow-green-100/50">

              {/* Admin badge */}
              <div className="flex justify-center mb-5">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-green-50 border border-green-200 text-[#4BA54F] text-xs font-bold tracking-widest uppercase">
                  <Shield size={12} />
                  Admin Access
                </span>
              </div>

              {/* Heading */}
              <div className="text-center mb-7">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
                  Welcome, Admin 👋
                </h2>
                <p className="text-sm text-gray-400 mt-1.5">
                  Sign in to access the admin dashboard
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                    <Mail size={15} className="text-[#4BA54F]" />
                    Admin Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4BA54F]/40 focus:border-[#4BA54F] transition-all duration-300 text-sm"
                    placeholder="admin@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                      <AlertTriangle size={12} /> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                    <Lock size={15} className="text-[#4BA54F]" />
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#4BA54F]/40 focus:border-[#4BA54F] transition-all duration-300 pr-12 text-sm"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4BA54F] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs flex items-center gap-1 mt-1">
                      <AlertTriangle size={12} /> {errors.password.message}
                    </p>
                  )}
                </div>

                {/* API error */}
                {isError && (
                  <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-200 flex items-center gap-2 text-sm">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-500" />
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Forgot */}
                <div className="flex justify-end">
                  <Link
                    to="/admin/forgot-password"
                    className="text-xs font-semibold text-[#4BA54F] hover:text-emerald-600 transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit */}
                <Button
                  isLoading={isPending}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4BA54F] to-emerald-500 hover:from-[#3d8f41] hover:to-emerald-600 text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-green-200 text-sm"
                >
                  Sign In as Admin
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Shield size={12} className="text-[#4BA54F]" /> Secure Login
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                {/* Security badges */}
                <div className="flex justify-center gap-4 text-xs text-gray-400 flex-wrap">
                  <span className="flex items-center gap-1">
                    <CheckCircle size={13} className="text-[#4BA54F]" /> 256-bit SSL
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield size={13} className="text-[#4BA54F]" /> Verified
                  </span>
                  <span className="flex items-center gap-1">
                    <Key size={13} className="text-[#4BA54F]" /> Encrypted
                  </span>
                </div>

                {/* Warning */}
                <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                  <AlertTriangle size={11} className="text-amber-400" />
                  Unauthorized access is strictly prohibited
                </p>
              </form>
            </div>

            {/* Mobile footer */}
            <p className="lg:hidden text-center text-xs text-gray-400 mt-5">
              Powered by{" "}
              <span className="text-[#4BA54F] font-semibold">Matz Solution's Pvt ltd</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatAnim {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50%       { transform: translateY(-18px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;