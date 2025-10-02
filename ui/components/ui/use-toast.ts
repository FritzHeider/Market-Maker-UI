"use client";

import { toast } from "sonner";

type ToastPayload = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function useToast() {
  function notify({ title, description, actionLabel, onAction }: ToastPayload) {
    toast(title, {
      description,
      action: actionLabel && onAction
        ? {
            label: actionLabel,
            onClick: onAction,
          }
        : undefined,
    });
  }

  return { toast: notify };
}
