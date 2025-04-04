"use client";

import { toast as baseToast } from "sonner";

type ToastOptions = Parameters<typeof baseToast>[0];

export const useToast = () => {
  return {
    toast: (options: ToastOptions) => {
      baseToast(options);
    },
  };
};
