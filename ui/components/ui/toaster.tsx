"use client";

import { useEffect, useRef } from "react";
import { useToastStore } from "@/lib/stores/toastStore";
import { useToast } from "./use-toast";

/**
 * Structure for notifications received via WebSocket.
 */
export type NotificationMessage = {
  type: "notification";
  title?: string;
  message: string;
};

/**
 * Custom hook to establish a WebSocket connection and dispatch toast notifications
 * while also updating the global toast store.
 */
export function useSystemToast() {
  const { notify } = useToast();
  const addToast = useToastStore((state) => state.addToast);
  const lastMessageRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Retrieve WebSocket endpoint from environment variables or use a fallback URL.
    const endpoint = process.env.NEXT_PUBLIC_WS_ENDPOINT || "wss://your-ws-endpoint";
    const ws = new WebSocket(endpoint);
    wsRef.current = ws;

    ws.onopen = () => {
      console.info(`[WebSocket] Connected to ${endpoint}`);
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as NotificationMessage;
        if (data.type !== "notification" || !data.message) return;

        // Prevent duplicate notifications.
        if (data.message === lastMessageRef.current) return;
        lastMessageRef.current = data.message;

        // Prepare a payload that satisfies the toast store requirements.
        const toastPayload = {
          title: data.title || "Notification",
          description: data.message,
          timestamp: Date.now(),
        };

        // Trigger a toast notification using the custom toast hook.
        // Pass the message as the first argument and an options object with duration as the second.
        notify(data.message, { duration: 5000 });

        // Add the payload to the global toast store.
        addToast(toastPayload);
      } catch (error) {
        console.error("[WebSocket] Failed to process message:", event.data, error);
      }
    };

    ws.onerror = (error: Event) => {
      console.error("[WebSocket] Error occurred:", error);
    };

    ws.onclose = (event: CloseEvent) => {
      console.info("[WebSocket] Connection closed:", event);
    };

    // Cleanup the WebSocket connection when the component unmounts.
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [addToast, notify]);
}
