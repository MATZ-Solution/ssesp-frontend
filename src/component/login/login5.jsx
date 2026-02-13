import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/govt-log.jpeg";

import {
  Mail,
  Lock,
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Users,
  Calendar,
  FileCheck,
  Award,
  Star,
} from "lucide-react";

import Button from "../button";
import { useLogin } from "../../../api/client/user";

const Login5 = () => {
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    applicationID: yup.string().required("Application ID is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .min(10, "Phone number must be at least 10 digits")
      .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const { userLogin, isSuccess, isPending, isError, error } = useLogin();

  // Handle successful login
  useEffect(() => {
    if (isSuccess) {
      // Navigate to dashboard or appropriate route after successful login
      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  const onSubmit = async (data) => {
    try {
      await userLogin(data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const floatingElements = [
    {
      Icon: Sparkles,
      delay: 0,
      duration: 20,
      size: 24,
      color: "text-[#4BA54F]",
    },
    {
      Icon: Shield,
      delay: 2,
      duration: 25,
      size: 28,
      color: "text-emerald-400",
    },
    { Icon: Zap, delay: 4, duration: 22, size: 26, color: "text-[#4BA54F]" },
    {
      Icon: CheckCircle,
      delay: 6,
      duration: 24,
      size: 30,
      color: "text-green-400",
    },
    {
      Icon: TrendingUp,
      delay: 8,
      duration: 23,
      size: 28,
      color: "text-emerald-500",
    },
    {
      Icon: BarChart3,
      delay: 10,
      duration: 21,
      size: 26,
      color: "text-[#4BA54F]",
    },
    {
      Icon: PieChart,
      delay: 12,
      duration: 26,
      size: 28,
      color: "text-green-400",
    },
    {
      Icon: Activity,
      delay: 14,
      duration: 24,
      size: 24,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-[#4BA54F]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>

      {/* Floating Elements - Hidden on small screens for performance */}
      <div className="hidden md:block">
        {floatingElements.map(({ Icon, delay, duration, size, color }, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${(i * 10) % 100}%`,
              top: `${(i * 15) % 100}%`,
              animation: `float ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <Icon size={size} className={color} />
          </div>
        ))}
      </div>

      <div className="relative h-full flex flex-col lg:flex-row">
        {/* Left Side - Dashboard Preview/Branding */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative flex-col justify-between p-6 xl:p-12 text-white overflow-y-auto">
          {/* Logo/Brand Section */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 mb-4 xl:mb-6">
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 xl:w-28 xl:h-24 rounded-lg object-cover flex-shrink-0"
              />
              <div className="space-y-3">
                <div>
                  <h3 className="text-sm xl:text-2xl font-bold text-emerald-400 leading-tight">
                    SINDH EDUCATION FOUNDATION
                  </h3>
                  <h3 className="text-xs xl:text-xl font-semibold text-emerald-300 mt-1">
                    Government of Sindh | SSEP
                  </h3>
                </div>
                <div className="border-l-4 border-emerald-500/50 pl-4 space-y-1">
                  <p className="text-sm xl:text-base font-semibold text-gray-200">
                    Session 2026-27
                  </p>
                  <p className="text-xs xl:text-sm text-gray-300 leading-relaxed max-w-md">
                    Application Form for Students of Government and SEF Schools in Grade 8, 9
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility & Selection Criteria */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 xl:gap-8">
            {/* Eligibility Criteria Section */}
            <div className="space-y-4 p-6 xl:p-7 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-500/30">
              <div className="flex items-center justify-between">
                <h3 className="text-base xl:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-400 flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Users size={20} className="text-emerald-300" />
                  </div>
                  Eligibility Criteria
                </h3>
                <div className="px-3 py-1 bg-emerald-500/20 rounded-full">
                  <span className="text-xs font-semibold text-emerald-300">
                    Required
                  </span>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-200">
                {[
                  {
                    icon: CheckCircle,
                    text: "Attended govt schools under SE&LD/SEF for 3 consecutive years",
                  },
                  {
                    icon: Calendar,
                    text: "Age: Class VIII ≤14 yrs, Class IX ≤15 yrs (April 1, 2026)",
                  },
                  {
                    icon: FileCheck,
                    text: "Permanent resident of Sindh district",
                  },
                  {
                    icon: FileCheck,
                    text: "No sibling currently availing scholarship",
                  },
                  {
                    icon: FileCheck,
                    text: "If siblings qualify, only one gets it (girl priority)",
                  },
                  {
                    icon: CheckCircle,
                    text: "Family income ≤ PKR 1,200,000/annum",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 group"
                  >
                    <item.icon
                      className="text-emerald-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform"
                      size={16}
                    />
                    <span className="leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Criteria Section */}
            <div className="space-y-4 p-6 xl:p-7 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 hover:border-emerald-500/30">
              <div className="flex items-center justify-between">
                <h3 className="text-base xl:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-400 flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/20 rounded-lg">
                    <Award size={20} className="text-emerald-300" />
                  </div>
                  Selection Criteria
                </h3>
                <div className="px-3 py-1 bg-emerald-500/20 rounded-full">
                  <span className="text-xs font-semibold text-emerald-300">
                    Scoring
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { subject: "English", min: "60", weight: "20%" },
                  { subject: "Math", min: "60", weight: "25%" },
                  { subject: "Sindhi/Urdu", min: "60", weight: "20%" },
                  { subject: "Science/GK", min: "60", weight: "20%" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 p-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 group hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-300 font-bold text-base group-hover:text-emerald-200 transition-colors">
                        {item.subject}
                      </span>
                      <Star
                        size={14}
                        className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>Min:</span>
                        <span className="font-semibold text-emerald-300">
                          {item.min}
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full"
                          style={{ width: item.weight }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">
                        Weight: {item.weight}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 hover:shadow-lg transition-all duration-300">
                <div className="p-2 bg-emerald-500/30 rounded-lg">
                  <Award className="text-emerald-300" size={20} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-emerald-200 font-bold text-base">
                    Interview
                  </span>
                  <span className="text-gray-300 text-xs">
                    Final assessment weightage
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-300">
                    15%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom branding */}
          <div className="flex justify-end">
            <div className="text-xs xl:text-sm text-gray-400 text-right">
              Powered by{" "}
              <span className="text-[#4BA54F] font-semibold">
                Matz Solutions Pvt Ltd
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          {/* Mobile Logo */}
          <div className="lg:hidden absolute top-4 left-4 flex items-center gap-2">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />
            <span className="text-white font-bold text-xs sm:text-sm">
              Government of Sindh SSEP
            </span>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md relative mt-16 lg:mt-0">
            {/* Decorative gradient */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4BA54F] to-emerald-500 rounded-2xl blur-lg opacity-20"></div>

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Sign in to access Portal
                </h2>
              </div>

              {/* Login Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 sm:space-y-5"
              >
                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <Lock size={16} className="text-[#4BA54F]" />
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      {...register("phoneNumber")}
                      className="w-full px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4BA54F] focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                      ⚠ {errors.phoneNumber.message}
                    </p>
                  )}
                </div>

                {/* Application ID Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <Mail size={16} className="text-[#4BA54F]" />
                    Application ID
                  </label>
                  <input
                    type="text"
                    {...register("applicationID")}
                    className="w-full px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4BA54F] focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    placeholder="Enter your application ID"
                  />
                  {errors.applicationID && (
                    <p className="text-red-400 text-xs sm:text-sm flex items-center gap-1">
                      ⚠ {errors.applicationID.message}
                    </p>
                  )}
                </div>

                {/* Error Message */}
                {isError && (
                  <div className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg shadow-md border border-red-300 flex items-center gap-2 sm:gap-3">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium text-xs sm:text-sm">
                      {error?.message || error || "Login failed. Please try again."}
                    </span>
                  </div>
                )}

                {/* Sign Up Link */}
                <div className="flex justify-end">
                  <Link
                    to="/signup"
                    className="text-xs sm:text-sm text-[#4BA54F] hover:text-emerald-400 transition-colors duration-300"
                  >
                    Sign Up
                  </Link>
                </div>

                {/* Login Button */}
                <Button
                  isLoading={isPending}
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4BA54F] to-emerald-500 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Sign In
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-4 sm:my-6">
                  <div className="flex-1 h-px bg-white/10"></div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                    <Shield size={14} className="text-[#4BA54F]" />
                    Secure login
                  </div>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Security badges */}
                <div className="flex justify-center gap-3 sm:gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <CheckCircle size={12} className="text-[#4BA54F]" />
                    256-bit SSL
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield size={12} className="text-[#4BA54F]" />
                    Verified
                  </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-gray-400 mt-3 sm:mt-4">
                  Protected by enterprise-grade security
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation CSS */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Login5;