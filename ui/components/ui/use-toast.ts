"use client";
import { toast as baseToast } from "sonner";

type ToastOptions = Parameters<typeof baseToast>[0];

export const useToast = () => ({
  notify: (options: ToastOptions) => baseToast(options),
  success: (msg: string) =>
    baseToast({ title: "✅ Success", description: msg }),
  error: (msg: string) =>
    baseToast({ title: "❌ Error", description: msg, variant: "destructive" }),
});
