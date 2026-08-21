import type { Config } from "tailwindcss";

/**
 * The design system lives in CSS custom properties in globals.css. Tailwind is
 * used here for layout and spacing only, so this config stays deliberately
 * small — there is one place to change a colour, not two.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
