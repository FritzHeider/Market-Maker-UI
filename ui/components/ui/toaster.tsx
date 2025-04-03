"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useToastStore } from "@/lib/stores/toastStore";

export function useSystemToast() {
  const { toast } = useToast();
  const addToast = useToastStore((s) => s.addToast);

  useEffect(() => {
    const ws = new WebSocket("wss://your-ws-endpoint");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "notification") {
        const toastPayload = {
          title: data.title || "Update",
          description: data.message,
          timestamp: Date.now(),
        };

        toast({
          title: toastPayload.title,
          description: toastPayload.description,
          duration: 5000,
        });

        addToast(toastPayload);
      }
    };

    return () => ws.close();
  }, [toast, addToast]);
}
