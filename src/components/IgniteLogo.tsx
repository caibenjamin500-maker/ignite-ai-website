"use client";

interface IgniteLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function IgniteLogo({ size = 48, className = "", showText = true }: IgniteLogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Flame SVG — recreated from the Ignite AI brand mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 0 12px rgba(204, 0, 68, 0.5)) drop-shadow(0 0 24px rgba(0, 191, 255, 0.2))" }}
      >
        <defs>
          <linearGradient id="flameOuter" x1="60" y1="0" x2="60" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CC0044" />
            <stop offset="40%" stopColor="#B0228C" />
            <stop offset="80%" stopColor="#9B30FF" />
            <stop offset="100%" stopColor="#7020CC" />
          </linearGradient>
          <linearGradient id="flameInner" x1="60" y1="20" x2="60" y2="115" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00BFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#00CED1" />
            <stop offset="100%" stopColor="#00BFFF" />
          </linearGradient>
          <linearGradient id="droplet" x1="60" y1="90" x2="60" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00CED1" />
            <stop offset="100%" stopColor="#00BFFF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer flame — left wing */}
        <path
          d="M32 90 C20 75, 15 55, 25 35 C30 22, 38 12, 42 8 C40 20, 38 30, 42 40 C46 50, 50 55, 48 65 C52 55, 55 42, 52 28 C58 15, 62 5, 62 5 C65 18, 63 30, 60 42 C70 28, 75 15, 72 4 C80 18, 82 35, 78 50 C74 65, 68 72, 72 82 C76 72, 80 60, 78 48 C85 60, 90 75, 88 90 C84 108, 72 118, 60 120 C48 122, 32 112, 28 98 C26 95, 28 92, 32 90Z"
          fill="url(#flameOuter)"
          filter="url(#glow)"
        />

        {/* Inner flame — cyan core */}
        <path
          d="M45 88 C40 78, 38 65, 44 52 C48 43, 53 37, 52 28 C57 38, 56 50, 52 60 C58 50, 63 38, 60 25 C66 38, 65 52, 60 63 C66 53, 70 42, 68 30 C75 45, 74 60, 68 72 C74 65, 78 55, 76 45 C82 58, 80 72, 74 82 C70 92, 65 100, 60 104 C55 108, 48 106, 45 100 C42 96, 43 92, 45 88Z"
          fill="url(#flameInner)"
          opacity="0.92"
        />

        {/* Teardrop / droplet at bottom */}
        <ellipse cx="60" cy="104" rx="10" ry="14" fill="url(#droplet)" opacity="0.95" />
      </svg>

      {showText && (
        <span
          className="font-black tracking-[0.18em] text-transparent"
          style={{
            fontSize: size * 0.42,
            background: "linear-gradient(135deg, #CC0044 0%, #B0228C 40%, #9B30FF 70%, #00BFFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.18em",
          }}
        >
          IGNITE AI
        </span>
      )}
    </div>
  );
}
