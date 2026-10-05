import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-plex-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-space-mono)", "ui-monospace", "SFMono-Regular"],
      },
      colors: {
        primary: "hsl(var(--primary) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        success: "hsl(var(--success) / <alpha-value>)",
        "ink-deep": "hsl(var(--ink-deep) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};

export default config;
