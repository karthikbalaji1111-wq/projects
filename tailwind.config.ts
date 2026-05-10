import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#03060c",
          900: "#070b14",
          800: "#101622",
          700: "#182132",
        },
        frost: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 72px rgba(34, 211, 238, 0.24)",
        panel: "0 24px 80px rgba(0,0,0,0.38)",
        line: "inset 0 1px 0 rgba(255,255,255,0.12)",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(-4%, -2%, 0) scale(1)" },
          "50%": { transform: "translate3d(4%, 3%, 0) scale(1.08)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.86)", opacity: "0.85" },
          "100%": { transform: "scale(1.35)", opacity: "0" },
        },
      },
      animation: {
        aurora: "aurora 14s ease-in-out infinite",
        shimmer: "shimmer 2.8s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
        pulseRing: "pulseRing 1.8s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
