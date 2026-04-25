import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F3EDE1",
        paper2: "#EDE6D8",
        paper3: "#E5DDCD",
        dark: "#0B1929",
        dark2: "#0F2035",
        dark3: "#172C45",
        ink: "#0D1B2A",
        ink2: "#3A4A5C",
        ink3: "#6A7A8C",
        fire: "#0047BA",
        fire2: "#1A5CC8",
        ember: "#002E5D",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
