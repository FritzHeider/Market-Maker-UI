"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useToastStore } from "@/lib/stores/toastStore";

type NotificationMessage = {
  type: "notification";
  title?: string;
  message: string;
};

export function useSystemToast() {
  const addToast = useToastStore((state) => state.addToast);
  const lastMessageRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://your-ws-endpoint");
    wsRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as NotificationMessage;

        if (data.type !== "notification" || !data.message) return;

        // Prevent duplicate toasts
        if (data.message === lastMessageRef.current) return;
        lastMessageRef.current = data.message;

        const toastPayload = {
          title: data.title || "📢 Update",
          description: data.message,
          timestamp: Date.now(),
        };

        toast({
          title: toastPayload.title,
          description: toastPayload.description,
        });

        addToast(toastPayload);
      } catch {
        console.warn("[WebSocket] Invalid notification payload:", event.data);
      }
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [addToast]);
}
