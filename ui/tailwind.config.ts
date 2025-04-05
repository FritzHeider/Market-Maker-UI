import type { Config } from "tailwindcss";

const config: Config = {
  // Specify the paths to all of your template files for tree-shaking in production.
  content: [
    "./app/**/*.{js,ts,jsx,tsx,css}",
    "./pages/**/*.{js,ts,jsx,tsx,css}",
    "./components/**/*.{js,ts,jsx,tsx,css}",
    "./lib/**/*.{js,ts,jsx,tsx}", // Include lib if needed
  ],
  // Enable dark mode via a CSS class.
  darkMode: "class",
  theme: {
    extend: {
      // Define custom keyframes for animations.
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        floatFast: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      // Create custom animation utilities using the keyframes above.
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        floatSlow: "floatSlow 6s ease-in-out infinite",
        floatFast: "floatFast 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
