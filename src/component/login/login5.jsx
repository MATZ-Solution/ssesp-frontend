import { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/mohid.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {
  Eye,
  EyeOff,
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
} from "lucide-react";
import {
  useNavigate

} from "react-router-dom";

const Login5 = () => {

  const [shownumber, setShownumber] = useState(false);
  const navigate = useNavigate()

  const loginSchema = yup.object().shape({
    applicantId: yup
      .string()
      .required('Applicant ID is required'),
    // Remove .email() if applicant ID isn't always an email
    number: yup  // Add this field
      .string()
      .required('Phone number is required')
      .min(10, 'Phone number must be at least 10 digits'),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    navigate('/form/student-info')
  };

  const floatingElements = [
    { Icon: Sparkles, delay: 0, duration: 20, size: 24, color: "text-[#4BA54F]" },
    { Icon: Shield, delay: 2, duration: 25, size: 28, color: "text-emerald-400" },
    { Icon: Zap, delay: 4, duration: 22, size: 26, color: "text-[#4BA54F]" },
    { Icon: CheckCircle, delay: 6, duration: 24, size: 30, color: "text-green-400" },
    { Icon: TrendingUp, delay: 8, duration: 23, size: 28, color: "text-emerald-500" },
    { Icon: BarChart3, delay: 10, duration: 21, size: 26, color: "text-[#4BA54F]" },
    { Icon: PieChart, delay: 12, duration: 26, size: 28, color: "text-green-400" },
    { Icon: Activity, delay: 14, duration: 24, size: 24, color: "text-emerald-400" },
    { Icon: Sparkles, delay: 16, duration: 22, size: 22, color: "text-[#4BA54F]" },
    { Icon: Shield, delay: 18, duration: 25, size: 26, color: "text-green-500" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#4BA54F]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000,transparent)]"></div>

      {/* Floating Elements */}
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

      <div className="relative min-h-screen flex">
        {/* Left Side - Dashboard Preview/Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 text-white">
          {/* Logo/Brand Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-8">
              <img src={logo} alt="Logo" className="w-40 h-22 rounded-lg" />
              <div>
                <h3 className="text-sm font-semibold text-emerald-400">
                  Sindh School Education Scholarship Program (SSESP) Portal
                </h3>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl font-bold leading-tight">
              Application Form
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4BA54F] to-emerald-400">
                For SSEP
              </span>
            </h1>

            <div className="mt-6 space-y-2">
              <p className="text-xl font-semibold text-emerald-300">
                SINDH EDUCATION FOUNDATION
              </p>
              <p className="text-lg text-gray-300">Session 2026-27</p>
              <p className="text-sm text-gray-400 max-w-md">
                Application Form for Students of Government and SEF Schools in Grade 6, 7, 8, 9
              </p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-4 my-8">
            {[
              { icon: TrendingUp, text: "Real-time Analytics" },
              { icon: Shield, text: "Secure & Encrypted" },
              { icon: BarChart3, text: "Visual Form" },
              { icon: Zap, text: "Lightning Fast" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <feature.icon className="text-[#4BA54F]" size={24} />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Bottom branding */}
          <div className="text-sm text-gray-400">
            Powered by{" "}
            <span className="text-[#4BA54F] font-semibold">
              Matz Solution's Pvt ltd
            </span>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          {/* Mobile Logo */}
          <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg" />
            <span className="text-white font-bold text-sm">
              Goverment of Sindh SSEP
            </span>
          </div>

          {/* Login Card */}
          <div className="w-full max-w-md relative">
            {/* Decorative gradient */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4BA54F] to-emerald-500 rounded-2xl blur-lg opacity-20"></div>

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome Back!
                </h2>
                <p className="text-gray-300">Sign in to access Portal</p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Applicant ID Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <Mail size={16} className="text-[#4BA54F]" />
                    Applicant id
                  </label>
                  <input
                    type="text"
                    {...register("applicantId")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4BA54F] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your applicant ID"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      ⚠ {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <Lock size={16} className="text-[#4BA54F]" />
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type={shownumber ? "text" : "password"}
                      {...register("number")}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4BA54F] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                    <button
                      type="button"
                      onClick={() => setShownumber(!shownumber)}
                      className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4BA54F] transition-colors duration-300"
                    >
                      {shownumber ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.number && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      ⚠ {errors.number.message}
                    </p>
                  )}
                </div>

                {/* Forgot number */}
                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-sm text-[#4BA54F] hover:text-emerald-400 transition-colors duration-300"
                  >
                    Forgot number?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#4BA54F] to-emerald-500 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-white/10"></div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Shield size={16} className="text-[#4BA54F]" />
                    Secure login
                  </div>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Security badges */}
                <div className="flex justify-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <CheckCircle size={14} className="text-[#4BA54F]" />
                    256-bit SSL
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield size={14} className="text-[#4BA54F]" />
                    Verified
                  </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-gray-400 mt-4">
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
          0%, 100% { 
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