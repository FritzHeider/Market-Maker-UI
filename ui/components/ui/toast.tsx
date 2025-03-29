// File: /components/ui/toast.tsx

import { useEffect } from "react";
import { useToast as useShadToast } from "@/components/ui/use-toast";

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

    return () => ws.close();
  }, [toast]);
}

// Usage in dashboard/page.tsx or layout:
// const { toast } = useToast();
// toast({ title: "Success", description: "Your bot has launched." });
