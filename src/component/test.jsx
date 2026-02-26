import { useState } from "react";

const statusConfig = {
    pending: {
        label: "Pending",
        color: "#D97706",
        bg: "rgba(217,119,6,0.09)",
        border: "rgba(217,119,6,0.3)",
        shadow: "0 4px 16px rgba(217,119,6,0.18)",
        dotBg: "#FEF3C7",
        stepIndex: 0,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        ),
    },
    "in review": {
        label: "In Review",
        color: "#7C3AED",
        bg: "rgba(124,58,237,0.08)",
        border: "rgba(124,58,237,0.25)",
        shadow: "0 4px 16px rgba(124,58,237,0.18)",
        dotBg: "#EDE9FE",
        stepIndex: 1,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
    },
    rejected: {
        label: "Rejected",
        color: "#DC2626",
        bg: "rgba(220,38,38,0.08)",
        border: "rgba(220,38,38,0.25)",
        shadow: "0 4px 16px rgba(220,38,38,0.18)",
        dotBg: "#FEE2E2",
        stepIndex: -1,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
            </svg>
        ),
    },
    completed: {
        label: "Completed",
        color: "#16A34A",
        bg: "rgba(22,163,74,0.1)",
        border: "rgba(34,197,94,0.35)",
        shadow: "0 4px 20px rgba(34,197,94,0.25)",
        dotBg: "#DCFCE7",
        stepIndex: 2,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        ),
    },
};

const steps = [
    { label: "Pending" },
    { label: "In Review" },
    { label: "Complete" },
];

const GRAD = "linear-gradient(135deg, #4ADE80, #22C55E, #10B981)";
const GLOW = "0 4px 20px rgba(34,197,94,0.3)";

export default function StatusTracker() {

    const [currentStatus, setCurrentStatus] = useState("pending");
    const [remark, setRemark] = useState(
        "Your application looks promising! Our team is carefully reviewing your documents."
    );

    const cfg = statusConfig[currentStatus];
    const isRejected = currentStatus === "rejected";
    const isCompleted = currentStatus === "completed";

    const fillWidth =
        cfg.stepIndex === 0 ? "0%" : cfg.stepIndex === 1 ? "50%" : "100%";

    return (
        <>
            {/* Keyframes for animations not available in base Tailwind */}
            <style>{`
        @keyframes bdot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }
        @keyframes sc-pulse {
          0%   { transform: scale(0.82); opacity: 0.7; }
          100% { transform: scale(1.38); opacity: 0; }
        }
        .animate-bdot   { animation: bdot 1.8s ease-in-out infinite; }
        .animate-scpulse{ animation: sc-pulse 2s ease-out infinite; }
      `}</style>

            {/* ── PAGE ROOT ── */}
            <div className="relative flex flex-col gap-6">

                {/* Radial glow overlays */}
                <div className="pointer-events-none fixed inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 55% 45% at 8% 12%, rgba(74,222,128,0.22) 0%, transparent 55%)," +
                            "radial-gradient(ellipse 45% 40% at 92% 88%, rgba(16,185,129,0.2) 0%, transparent 55%)," +
                            "radial-gradient(ellipse 30% 25% at 88% 8%, rgba(34,197,94,0.14) 0%, transparent 50%)",
                    }}
                />

                {/* ── MAIN CARD ── */}
                <div
                    className="relative z-10 w-full max-w-[440px] bg-white rounded-[28px] overflow-hidden"
                    style={{
                        boxShadow:
                            "0 1px 0 rgba(34,197,94,0.18), 0 2px 4px rgba(0,0,0,0.03), 0 12px 32px rgba(0,0,0,0.09), 0 0 0 1px rgba(34,197,94,0.13)",
                    }}
                >
                    {/* Top gradient stripe */}
                    <div className="h-[5px] w-full" style={{ background: GRAD }} />

                    {/* Card body */}
                    <div className="px-7 pt-6 pb-8">

                        {/* ── TOP ROW: title + badge ── */}
                        <div className="flex items-start justify-between gap-3 mb-1.5">
                            <div>
                                <p className="text-[10.5px] font-bold uppercase tracking-widest text-green-300 mb-1">
                                    Progress Update
                                </p>
                                <h2 className="text-[21px] font-extrabold text-green-900 leading-tight">
                                    Application<br />Status
                                </h2>
                            </div>

                            {/* Status badge */}
                            {isCompleted ? (
                                <div
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mt-0.5 flex-shrink-0"
                                    style={{ background: GRAD, boxShadow: GLOW }}
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-white text-[12.5px] font-bold">Completed</span>
                                </div>
                            ) : (
                                <div
                                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mt-0.5 flex-shrink-0 border transition-all duration-300"
                                    style={{
                                        borderColor: cfg.border,
                                        background: cfg.bg,
                                        boxShadow: cfg.shadow,
                                    }}
                                >
                                    <div
                                        className={`w-[7px] h-[7px] rounded-full flex-shrink-0 ${!isRejected ? "animate-bdot" : ""}`}
                                        style={{ background: cfg.color }}
                                    />
                                    <span className="text-[12.5px] font-bold" style={{ color: cfg.color }}>
                                        {cfg.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* ── DIVIDER ── */}
                        <div
                            className="h-px my-5"
                            style={{
                                background:
                                    "linear-gradient(90deg, transparent, rgba(34,197,94,0.25), rgba(16,185,129,0.2), transparent)",
                            }}
                        />

                        {/* ── REJECTED BANNER ── */}
                        {isRejected && (
                            <div className="flex items-start gap-3 p-4 mb-5 bg-red-50 border border-red-100 rounded-2xl">
                                <div className="w-[34px] h-[34px] rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 text-red-600">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[13px] font-bold text-red-900 mb-0.5">Application Not Approved</p>
                                    <p className="text-[12px] text-red-400 leading-relaxed">
                                        This application did not proceed further. See remarks below for details.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* ── PROGRESS STEPS ── */}
                        {!isRejected && (
                            <div className="relative flex items-start justify-between mb-6">
                                {/* Track */}
                                <div
                                    className="absolute top-[19px] h-[3px] rounded-full bg-green-100 overflow-hidden z-0"
                                    style={{ left: "calc(16.66% + 14px)", right: "calc(16.66% + 14px)" }}
                                >
                                    <div
                                        className="h-full rounded-full transition-all duration-700 ease-in-out"
                                        style={{
                                            width: fillWidth,
                                            background: GRAD,
                                            boxShadow: "0 0 8px rgba(74,222,128,0.5)",
                                        }}
                                    />
                                </div>

                                {steps.map((step, i) => {
                                    const isDone = i < cfg.stepIndex;
                                    const isActive = i === cfg.stepIndex;
                                    return (
                                        <div key={i} className="flex flex-col items-center gap-2 flex-1 relative z-10">
                                            {/* Circle */}
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center border-[2.5px] relative text-xs font-bold transition-all duration-300
                          ${isDone
                                                        ? "border-transparent text-white"
                                                        : isActive
                                                            ? "border-current"
                                                            : "bg-gray-100 border-gray-200 text-gray-400"
                                                    }`}
                                                style={
                                                    isDone
                                                        ? { background: GRAD, boxShadow: "0 4px 14px rgba(34,197,94,0.35)" }
                                                        : isActive
                                                            ? {
                                                                background: cfg.dotBg,
                                                                borderColor: cfg.color,
                                                                color: cfg.color,
                                                                boxShadow: cfg.shadow,
                                                            }
                                                            : {}
                                                }
                                            >
                                                {/* Pulse ring on active */}
                                                {isActive && (
                                                    <span
                                                        className="animate-scpulse absolute inset-[-7px] rounded-full border-2 opacity-0"
                                                        style={{ borderColor: cfg.color }}
                                                    />
                                                )}
                                                {isDone ? (
                                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    i + 1
                                                )}
                                            </div>

                                            {/* Label */}
                                            <span
                                                className={`text-[10px] font-semibold text-center max-w-[68px] leading-snug tracking-tight transition-colors duration-300
                          ${isDone ? "text-green-600 font-bold" : isActive ? "font-bold" : "text-gray-400"}`}
                                                style={isActive ? { color: cfg.color } : {}}
                                            >
                                                {step.label}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* ── REMARK BOX ── */}
                        {remark && (
                            <div
                                className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl px-4 py-3.5 transition-all duration-300"
                                style={{ borderLeftWidth: 4, borderLeftColor: cfg.color }}
                            >
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.color }} />
                                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: cfg.color }}>
                                        Remark
                                    </p>
                                </div>
                                <p className="text-[13.5px] text-gray-700 leading-relaxed">{remark}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}