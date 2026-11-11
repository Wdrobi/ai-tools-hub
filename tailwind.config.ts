import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { brand: { 50: "#f5f3ff", 100: "#ede9fe", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 950: "#1e1b4b" } },
    boxShadow: { soft: "0 12px 40px rgba(15, 23, 42, .07)" }
  } }, plugins: []
};
export default config;
