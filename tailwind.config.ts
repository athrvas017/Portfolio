import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Obsidian × Amber Design System Tokens ──────────────────────────
        background: "#101113",
        surface: "#1B1E22",
        "surface-raised": "#25292E",
        "surface-deep": "#141618",
        "surface-container-lowest": "#0D0E10",
        "surface-container-low": "#15171A",
        "surface-container": "#1B1E22",
        "surface-container-high": "#22262C",
        "surface-container-highest": "#2E3339",
        "surface-overlay": "#1F2329",

        border: "#383D43",
        "border-subtle": "#383D43",
        "border-focus": "#525963",

        text: "#F0EDE6",
        "text-main": "#F0EDE6",
        "text-muted": "#A5A8AC",
        "text-subtle": "#777D83",
        "text-dim": "#6E737A",

        primary: "#FFB454",
        "primary-hover": "#FFC477",
        "primary-container": "#FFB454",
        "on-primary": "#101113",

        secondary: "#79C9B0",
        "secondary-hover": "#90E1C7",
        "secondary-container": "#1C3E36",
        "on-secondary": "#00382E",
        mint: "#79C9B0",
        "mint-soft": "rgba(121, 201, 176, 0.12)",

        accent: "#FFB454",
        "accent-hover": "#FFC477",
        "accent-soft": "rgba(255, 180, 84, 0.12)",

        success: "#83D6A0",
        warning: "#FFB454",
        danger: "#F08D8D",
        tertiary: "#85C2FF",

        // ── Backward Compatibility ──────────────────────────────────────────
        "ss-background": "#101113",
        "ss-surface": "#1B1E22",
        "ss-surface-lowest": "#0D0E10",
        "ss-surface-low": "#15171A",
        "ss-surface-base": "#1B1E22",
        "ss-surface-high": "#25292E",
        "ss-surface-highest": "#2E3339",
        "ss-surface-bright": "#37393F",
        "ss-on-surface": "#F0EDE6",
        "ss-on-surface-var": "#A5A8AC",
        "ss-outline": "#525963",
        "ss-outline-var": "#383D43",
        "ss-primary": "#FFB454",
        "ss-secondary": "#FFB454",
        "ss-tertiary": "#79C9B0",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-plus-jakarta)", "var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "22px",
        full: "9999px",
      },
      boxShadow: {
        "amber-glow": "0 0 20px rgba(255,180,84,0.22)",
        "amber-glow-lg": "0 0 35px rgba(255,180,84,0.35)",
        "mint-glow": "0 0 20px rgba(121,201,176,0.22)",
        "panel-subtle": "0 4px 30px rgba(0,0,0,0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
