import { useEffect } from "react";

export default function SSESPLoader({ isLoading = true, onComplete }) {
  useEffect(() => {
    if (!isLoading && onComplete) {
      onComplete();
    }
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 30%, #a5d6a7 60%, #66bb6a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "2rem",
        fontFamily: "monospace",
      }}
    >
      <style>{`
        .loader {
          display: flex;
          align-items: center;
          gap: 4px;
          margin: 0.25em 0;
        }
        .absolute { position: absolute; }
        .inline-block { display: inline-block; }

        .dash {
          animation: dashArray 2s ease-in-out infinite,
            dashOffset 2s linear infinite;
        }
        .spin {
          animation: spinDashArray 2s ease-in-out infinite,
            spinLetter 8s ease-in-out infinite,
            dashOffset 2s linear infinite;
          transform-origin: center;
        }

        @keyframes dashArray {
          0%   { stroke-dasharray: 0 1 359 0; }
          50%  { stroke-dasharray: 0 359 1 0; }
          100% { stroke-dasharray: 359 1 0 0; }
        }
        @keyframes spinDashArray {
          0%   { stroke-dasharray: 270 90; }
          50%  { stroke-dasharray: 0 360; }
          100% { stroke-dasharray: 270 90; }
        }
        @keyframes dashOffset {
          0%   { stroke-dashoffset: 365; }
          100% { stroke-dashoffset: 5; }
        }
        @keyframes spinLetter {
          0%            { rotate: 0deg; }
          12.5%, 25%    { rotate: 270deg; }
          37.5%, 50%    { rotate: 540deg; }
          62.5%, 75%    { rotate: 810deg; }
          87.5%, 100%   { rotate: 1080deg; }
        }
      `}</style>

      {/* Hidden SVG for gradient defs */}
      <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
        <defs xmlns="http://www.w3.org/2000/svg">

          {/* S1 – deep forest to lime */}
          <linearGradient gradientUnits="userSpaceOnUse" x1="0" y1="62" x2="0" y2="2" id="s1">
            <stop stopColor="#00C853" />
            <stop stopColor="#1B5E20" offset="1" />
          </linearGradient>

          {/* S2 – spinning emerald */}
          <linearGradient gradientUnits="userSpaceOnUse" x1="0" y1="64" x2="0" y2="0" id="s2">
            <stop stopColor="#00E676" />
            <stop stopColor="#004D40" offset="1" />
            <animateTransform
              repeatCount="indefinite"
              keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
              keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
              dur="8s"
              values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
              type="rotate"
              attributeName="gradientTransform"
            />
          </linearGradient>

          {/* E – jade to mint */}
          <linearGradient gradientUnits="userSpaceOnUse" x1="0" y1="62" x2="0" y2="2" id="eg">
            <stop stopColor="#69F0AE" />
            <stop stopColor="#00695C" offset="1" />
          </linearGradient>

          {/* S3 – hunter to seafoam */}
          <linearGradient gradientUnits="userSpaceOnUse" x1="0" y1="62" x2="0" y2="2" id="s3">
            <stop stopColor="#B9F6CA" />
            <stop stopColor="#2E7D32" offset="1" />
          </linearGradient>

          {/* P – neon green to dark olive */}
          <linearGradient gradientUnits="userSpaceOnUse" x1="0" y1="62" x2="0" y2="2" id="pg">
            <stop stopColor="#CCFF90" />
            <stop stopColor="#33691E" offset="1" />
          </linearGradient>

        </defs>
      </svg>

      <div className="loader">

        {/* ── S (letter 1) ── */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#s1)"
            className="dash"
            pathLength="360"
            d="
              M 50,15
              C 50,8 44,4 32,4
              C 20,4 14,10 14,18
              C 14,26 22,30 32,32
              C 42,34 50,38 50,46
              C 50,54 44,60 32,60
              C 20,60 14,56 14,50
            "
          />
        </svg>

        {/* ── S (letter 2, spinning) ── */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#s2)"
            className="spin"
            pathLength="360"
            d="
              M 50,15
              C 50,8 44,4 32,4
              C 20,4 14,10 14,18
              C 14,26 22,30 32,32
              C 42,34 50,38 50,46
              C 50,54 44,60 32,60
              C 20,60 14,56 14,50
            "
          />
        </svg>

        {/* ── E ── */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#eg)"
            className="dash"
            pathLength="360"
            d="
              M 50,4
              H 14
              V 60
              H 50
              M 14,32
              H 44
            "
          />
        </svg>

        {/* ── S (letter 3) ── */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#s3)"
            className="dash"
            pathLength="360"
            d="
              M 50,15
              C 50,8 44,4 32,4
              C 20,4 14,10 14,18
              C 14,26 22,30 32,32
              C 42,34 50,38 50,46
              C 50,54 44,60 32,60
              C 20,60 14,56 14,50
            "
          />
        </svg>

        {/* ── P ── */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height="64" width="64" className="inline-block">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="8"
            stroke="url(#pg)"
            className="dash"
            pathLength="360"
            d="
              M 14,60
              V 4
              H 38
              C 54,4 54,32 38,32
              H 14
            "
          />
        </svg>

      </div>

      <p style={{ color: "#1B5E20", letterSpacing: "0.4em", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "bold", textShadow: "0 1px 2px rgba(255,255,255,0.5)" }}>
        Loading…
      </p>
    </div>
  );
}