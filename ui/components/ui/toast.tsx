"use client";

import { useEffect } from "react";
import { toast } from "sonner"; // ✅ Only use this

type NotificationMessage = {
  type: "notification";
  title?: string;
  message: string;
};

export function useSystemToast() {
  useEffect(() => {
    const ws = new WebSocket("wss://your-ws-endpoint");

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as NotificationMessage;

        if (data.type === "notification" && data.message) {
          toast({
            title: data.title || "📢 Update",
            description: data.message,
            duration: 5000,
          });
        }
      } catch {
        console.warn("[WebSocket] Invalid notification payload", event.data);
      }
    };

    return () => ws.close();
  }, []);
}
