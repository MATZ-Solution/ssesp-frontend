export default function RingChart({ value, label, color }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="72" height="72" viewBox="0 0 72 72">
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="8"
        />
        <circle
          cx="36"
          cy="36"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{ transition: "stroke-dasharray 0.7s ease" }}
        />
        <text
          x="36"
          y="40"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#1e293b"
        >
          {value}%
        </text>
      </svg>
      <span className="text-xs text-slate-500 text-center">{label}</span>
    </div>
  );
}