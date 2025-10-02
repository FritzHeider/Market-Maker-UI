import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{mdx,md}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono]
      },
      borderRadius: {
        lg: "calc(var(--radius) - 4px)",
        xl: "var(--radius)",
        "2xl": "calc(var(--radius) + 6px)",
        full: "9999px"
      },
      boxShadow: {
        card: "0 24px 48px -32px hsl(var(--shadow))",
        menu: "0 20px 40px -28px hsl(var(--shadow))",
        ring: "0 0 0 4px hsl(var(--ring) / 0.1)",
        subtle: "0 1px 2px 0 hsl(var(--shadow) / 0.08)"
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--muted))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--bg))",
        foreground: "hsl(var(--fg))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-fg))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-fg))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-fg))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-fg))"
        },
        warn: "hsl(var(--warn))",
        danger: "hsl(var(--danger))"
      },
      backgroundImage: {
        "grid-soft": "radial-gradient(circle at center, hsl(var(--primary) / 0.08), transparent 60%)",
        "hero-radial": "radial-gradient(120% 120% at 50% 0%, hsl(var(--primary) / 0.12), transparent)"
      },
      transitionTimingFunction: {
        "curve-snap": "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -6px, 0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/typography"),
    require("@tailwindcss/container-queries"),
    plugin(({ addVariant, addUtilities }) => {
      addVariant("hocus", "&:hover, &:focus-visible");
      addUtilities({
        ".bg-glass": {
          backgroundColor: "hsl(var(--bg) / 0.7)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        },
        ".shadow-focus": {
          boxShadow: "0 0 0 4px hsl(var(--ring) / 0.3)",
        }
      });
    })
  ]
};

export default config;
