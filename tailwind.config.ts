import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bengali: ["Hind Siliguri", "Noto Sans Bengali", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        skeleton: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        skeleton: "skeleton 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        bazardor: {
          primary: "#16a34a",
          "primary-content": "#ffffff",
          secondary: "#f59e0b",
          "secondary-content": "#ffffff",
          accent: "#3b82f6",
          "accent-content": "#ffffff",
          neutral: "#1f2937",
          "neutral-content": "#ffffff",
          "base-100": "#fefce8",
          "base-200": "#fef9c3",
          "base-300": "#fde68a",
          "base-content": "#1f2937",
          info: "#3b82f6",
          success: "#16a34a",
          warning: "#f59e0b",
          error: "#dc2626",
        },
      },
    ],
    darkTheme: "bazardor",
  },
};

export default config;
