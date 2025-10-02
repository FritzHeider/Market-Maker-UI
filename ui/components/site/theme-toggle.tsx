"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, useReducedMotion } from "framer-motion";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const isDark = (theme ?? resolvedTheme) === "dark";

  function handleChange(checked: boolean) {
    setTheme(checked ? "dark" : "light");
  }

  return (
    <label className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
      <span className="sr-only">Toggle theme</span>
      <Switch checked={isDark} onCheckedChange={handleChange} aria-label="Toggle dark mode" />
      <div className="relative h-5 w-5 text-muted-foreground">
        <motion.span
          layout
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {isDark ? <Moon className="h-5 w-5" aria-hidden="true" /> : <Sun className="h-5 w-5" aria-hidden="true" />}
        </motion.span>
      </div>
    </label>
  );
}
