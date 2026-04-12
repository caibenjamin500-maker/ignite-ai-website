import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ignite: {
          crimson: "#CC0044",
          magenta: "#B0228C",
          purple: "#9B30FF",
          cyan: "#00BFFF",
          teal: "#00CED1",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "fog-1": "fog1 18s ease-in-out infinite",
        "fog-2": "fog2 24s ease-in-out infinite",
        "fog-3": "fog3 20s ease-in-out infinite",
        "fog-4": "fog4 28s ease-in-out infinite",
        "fog-5": "fog5 22s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        fog1: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.12" },
          "33%": { transform: "translate(8%, -6%) scale(1.15)", opacity: "0.20" },
          "66%": { transform: "translate(-5%, 8%) scale(0.9)", opacity: "0.08" },
        },
        fog2: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.10" },
          "25%": { transform: "translate(-10%, 5%) scale(1.2)", opacity: "0.18" },
          "75%": { transform: "translate(7%, -8%) scale(0.85)", opacity: "0.07" },
        },
        fog3: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.15" },
          "50%": { transform: "translate(6%, 10%) scale(1.1)", opacity: "0.22" },
        },
        fog4: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.08" },
          "40%": { transform: "translate(-8%, -5%) scale(1.25)", opacity: "0.16" },
          "80%": { transform: "translate(10%, 6%) scale(0.9)", opacity: "0.06" },
        },
        fog5: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)", opacity: "0.12" },
          "60%": { transform: "translate(-6%, 8%) scale(1.1)", opacity: "0.19" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        glow: {
          "0%": { textShadow: "0 0 20px rgba(204, 0, 68, 0.5)" },
          "100%": { textShadow: "0 0 40px rgba(0, 191, 255, 0.5)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
