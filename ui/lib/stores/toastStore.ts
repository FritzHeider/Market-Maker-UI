import { create } from "zustand";

// Define the maximum number of toast notifications to keep.
const MAX_TOASTS = 5;

/**
 * A single toast notification item.
 */
export type ToastItem = {
  title: string;
  description?: string;
  timestamp: number;
};

/**
 * The toast store state and actions.
 */
export type ToastStore = {
  toasts: ToastItem[];
  addToast: (toast: ToastItem) => void;
  clearToasts: () => void;
};

/**
 * Zustand store for managing toast notifications.
 */
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast: ToastItem) =>
    set((state) => ({
      // Add new toast to the beginning and keep only the last MAX_TOASTS items.
      toasts: [toast, ...state.toasts].slice(0, MAX_TOASTS),
    })),
  clearToasts: () => set({ toasts: [] }),
}));
