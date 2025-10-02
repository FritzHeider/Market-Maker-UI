"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      richColors
      theme="system"
      toastOptions={{
        style: {
          borderRadius: "1rem",
          border: "1px solid hsl(var(--border))",
          background: "hsl(var(--card))",
          color: "hsl(var(--card-fg))",
          boxShadow: "0 20px 40px -24px hsl(var(--shadow))",
        },
      }}
    />
  );
}
