// File: /components/ui/use-toast.ts
"use client";

import { toast as baseToast } from "sonner"; // or 'shadcn/ui' if you're using that
import type { ToastOptions } from "sonner";  // or from your toast system

export const useToast = () => {
  return {
    toast: (options: ToastOptions) => {
      baseToast(options);
    },
  };
};
