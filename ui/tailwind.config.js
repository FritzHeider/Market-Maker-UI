/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // ✅ Include App Router files
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ UI components
    "./lib/**/*.{js,ts,jsx,tsx}",        // ✅ Optional: if using Tailwind in lib
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
