import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import logo from "../../assets/govt-log.jpeg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {
  Sparkles,
  Shield,
  Zap,
  CheckCircle,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Phone,
  IdCard,
  X,
  Mail,
} from "lucide-react";
import {
  useNavigate
} from "react-router-dom";
import { useSignUp } from "../../../api/client/user";
import Button from "../button"

const Signup = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const signupSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Please enter a valid email address'),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    }
  });

  const { addSignUp, isSuccess, isPending, isError, error, data } = useSignUp()

  const onSubmit = async (data) => {
    addSignUp(data)
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

  const featureModals = {
    "Easy Registration": {
      title: "Scholarship Coverage",
      description: "This Scholarship covers the following free facilities:",
      features: [
        "Admission & Tuition Fees",
        "Examination fees",
        "Boarding & Lodging facilities",
        "School Uniforms",
        "School Shoes",
        "Text Books",
        "Monthly Stipend"
      ]
    },
    "Secure & Encrypted": {
      title: "Eligibility Criteria",
      description: "To be eligible for this scholarship, applicants must meet the following requirements:",
      features: [
        "Must have studied consecutively for the last three years in Sindh Government schools or SEF schools",
        "Age limit: Must not be older than 14 years as on 1st April, 2026",
        "Must be a permanent resident of the respective district of Sindh",
        "Applicants with a sibling currently availing the scholarship are not eligible",
        "If more than one child qualifies, only one will be selected (preference given to girl child)",
        "Annual income of parents/guardian from all sources up to PKR 1,200,000 per annum"
      ]
    },
    "Track Progress": {
      title: "Selection Criteria",
      description: "Selection shall be made on the basis of Entry Test results and Interview:",
      features: [
        "English – Minimum 60 marks (Weightage 20%)",
        "Mathematics – Minimum 60 marks (Weightage 25%)",
        "Sindhi/Urdu – Minimum 60 marks (Weightage 20%)",
        "Science/General Knowledge – Minimum 60 marks (Weightage 20%)",
        "Interview – Weightage 15%",
        "For class VIII admission, entry test will be from class VII syllabus (Sindh Textbook Board)"
      ]
    },
    "Quick Approval": {
      title: "Application Procedure & Documents",
      description: "Follow these steps to complete your application:",
      features: [
        "Application only available online at: https://sef.org.pk/ssesp/apply",
        "Last date for application: 25th February, 2026",
        "Only complete applications with supporting documents will be entertained",
        "Required Documents: Recent passport-size photo, GR page (3 years confirmation), Student B-Form, parent/guardian CNIC, Domicile, PRC, and verified income certificate",
        "Submission of false/forged documents will lead to scholarship cancellation and legal action",
        "Scholarship continuation requires minimum 60% marks in subsequent academic years"
      ]
    }
  };

  const Modal = ({ isOpen, onClose, content }) => {
    if (!isOpen) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <div 
          className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 max-w-lg w-full border border-white/20 shadow-2xl transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Modal content */}
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#4BA54F] to-emerald-400">
              {content.title}
            </h3>
            <p className="text-gray-300 mb-6">
              {content.description}
            </p>
            
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
                Key Features:
              </h4>
              {content.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle size={20} className="text-[#4BA54F] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="mt-8 w-full bg-gradient-to-r from-[#4BA54F] to-emerald-500 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    );
  };

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
              <img src={logo} alt="Logo" className="w-30 h-22 rounded-lg" />
              <div>
                <h3 className="text-md font-semibold text-emerald-400">
                  Sindh School Education Scholarship Program (SSESP) Portal
                </h3>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl font-bold leading-tight">
              SINDH EDUCATION FOUNDATION
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4BA54F] to-emerald-400">
                GOVERNMENT OF SINDH
              </span>
            </h1>

            <div className="mt-6 space-y-2">
              <p className="text-xl font-semibold text-emerald-300">
                SSESP
              </p>
              <p className="text-lg text-gray-300">Session 2026-27</p>
              <p className="text-sm text-gray-400 max-w-md">
                Application Form for Students of Government and SEF Schools in Grade 8
              </p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-4 my-8">
            {[
              { icon: TrendingUp, text: "Easy Registration", display: "Scholarship Coverage" },
              { icon: Shield, text: "Secure & Encrypted", display: "Eligibility Criteria" },
              { icon: BarChart3, text: "Track Progress", display: "Selection Criteria" },
              { icon: Zap, text: "Quick Approval", display: "Application Process" },
            ].map((feature, idx) => (
              <button
                key={idx}
                onClick={() => setActiveModal(feature.text)}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-105 hover:border-[#4BA54F]/50"
              >
                <feature.icon className="text-[#4BA54F]" size={24} />
                <span className="text-sm font-medium">{feature.display}</span>
              </button>
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

        {/* Right Side - Signup Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          {/* Mobile Logo */}
          <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-lg" />
            <span className="text-white font-bold text-sm">
              Government of Sindh SSEP
            </span>
          </div>

          {/* Signup Card */}
          <div className="w-full max-w-md relative my-8">
            {/* Decorative gradient */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4BA54F] to-emerald-500 rounded-2xl blur-lg opacity-20"></div>

            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Create Account
                </h2>
                <p className="text-gray-300">Join SSEP Today!</p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Phone Number with Controller */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <Mail size={16} className="text-[#4BA54F]" />
                    Email Address
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4BA54F] focus:border-transparent transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      ⚠ {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Application ID with Controller */}
                {/* <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
                    <IdCard size={16} className="text-[#4BA54F]" />
                    Application ID
                  </label>
                  <Controller
                    name="applicationID"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4BA54F] focus:border-transparent transition-all duration-300"
                        placeholder="Enter your application ID"
                      />
                    )}
                  />
                  {errors.applicationID && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      ⚠ {errors.applicationID.message}
                    </p>
                  )}
                </div> */}

                {/* Terms and Conditions */}
                {/* <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 rounded border-white/10 bg-white/5 text-[#4BA54F] focus:ring-[#4BA54F] focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-300">
                    I agree to the{" "}
                    <a href="#" className="text-[#4BA54F] hover:text-emerald-400">
                      Terms & Conditions
                    </a>
                  </label>
                </div> */}

                {/* Signup Button */}
                <Button isLoading={isPending} type="submit"
                  className="w-full bg-gradient-to-r from-[#4BA54F] to-emerald-500 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                 Create Account
                </Button>

                {/* Success Message */}
                {data?.data?.message === 'User added successfully' && (
                  <div className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 px-4 py-3 rounded-lg shadow-md border border-green-300 flex items-center gap-3">
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-medium">Your application ID is: {data?.data?.applicantID}</span>
                  </div>
                )}

                {/* Error message */}
                {isError && (
                  <div className="bg-gradient-to-r from-red-100 to-red-200 text-red-800 px-4 py-3 rounded-lg shadow-md border border-red-300 flex items-center gap-3">
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-red-600"
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
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="flex items-center gap-4 my-4">
                  <div className="flex-1 h-px bg-white/10"></div>
                  <span className="text-sm text-gray-400">Already have an account?</span>
                  <div className="flex-1 h-px bg-white/10"></div>
                </div>

                {/* Login Link */}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                >
                  Sign In Instead
                </button>

                {/* Security badges */}
                <div className="flex justify-center gap-4 text-xs text-gray-400 pt-2">
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
                <p className="text-center text-xs text-gray-400">
                  Protected by enterprise-grade security
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <Modal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          content={featureModals[activeModal]}
        />
      )}

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

export default Signup;