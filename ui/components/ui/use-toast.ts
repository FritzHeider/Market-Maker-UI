"use client";

import { toast as baseToast } from "sonner";

// Wrap the underlying toast library so that it accepts a message and options.
export const useToast = () => {
  return {
    // Trigger a toast with a message and optional options (e.g., duration).
    notify: (msg: string, options?: { duration?: number }) => baseToast(msg, options),
    // For success and error, simply call baseToast with the message.
    success: (msg: string) => baseToast(msg),
    error: (msg: string) => baseToast(msg),
    promise: baseToast.promise,
  };
};
