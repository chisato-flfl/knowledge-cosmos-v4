import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          bg: "#07071a",
          nebula: "#0d0d2b",
          star: "#e2e8f0",
          purple: "#7c3aed",
          violet: "#a855f7",
          blue: "#3b82f6",
          indigo: "#6366f1",
          glow: "#c4b5fd",
        },
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        pulse_slow: "pulse 4s ease-in-out infinite",
        orbit: "orbit 20s linear infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 8px 2px rgba(139, 92, 246, 0.4)" },
          "50%": { boxShadow: "0 0 24px 8px rgba(139, 92, 246, 0.9)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
