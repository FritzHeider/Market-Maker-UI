"use client";

import { useEffect } from "react";
import { useToast as useShadToast } from "@/components/ui/use-toast";

/**
 * Hook: useSystemToast
 * Connects to a WebSocket and shows toasts in real-time.
 */
export function useSystemToast() {
  const { toast } = useShadToast();

  useEffect(() => {
    const ws = new WebSocket("wss://your-ws-endpoint");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "notification") {
        toast({
          title: data.title || "Update",
          description: data.message,
          duration: 5000,
        });
      }
    };

    return () => {
      ws.close();
    };
  }, [toast]);
}
