import { create } from "zustand";

type ToastItem = {
  title: string;
  description?: string;
  timestamp: number;
};

type ToastStore = {
  toasts: ToastItem[];
  addToast: (toast: ToastItem) => void;
  clearToasts: () => void;
};

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [toast, ...state.toasts.slice(0, 4)], // keep last 5
    })),
  clearToasts: () => set({ toasts: [] }),
}));
