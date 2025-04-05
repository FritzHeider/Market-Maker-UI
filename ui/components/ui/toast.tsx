"use client";

import { useEffect, useRef } from "react";
import { useToast } from "./use-toast"; // Ensure this path is correct

// Define the shape of the notification messages received from the WebSocket.
export type NotificationMessage = {
  type: "notification";
  title?: string;
  message: string;
};

/**
 * Custom hook to establish a WebSocket connection and dispatch system toast notifications.
 */
export function useSystemToast() {
  const { notify } = useToast();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Use an environment variable for the WebSocket endpoint, or fall back to a default URL.
    const endpoint = process.env.NEXT_PUBLIC_WS_ENDPOINT || "wss://your-ws-endpoint";
    const ws = new WebSocket(endpoint);
    wsRef.current = ws;

    ws.onopen = () => {
      console.info(`[WebSocket] Connected to ${endpoint}`);
    };

    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as NotificationMessage;
        // Only process notifications with a valid message.
        if (data.type === "notification" && data.message) {
          // Trigger a toast notification with the message and a duration of 5000ms.
          notify(data.message, { duration: 5000 });
        }
      } catch (error) {
        console.error("[WebSocket] Error parsing notification payload:", event.data, error);
      }
    };

    ws.onerror = (error: Event) => {
      console.error("[WebSocket] Error occurred:", error);
    };

    ws.onclose = (event: CloseEvent) => {
      console.info("[WebSocket] Connection closed:", event);
    };

    // Cleanup: close the WebSocket connection on unmount.
    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [notify]);
}
