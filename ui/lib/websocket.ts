import { useEffect, useRef } from "react";

type UseWebSocketOptions = {
  protocols?: string | string[];
  autoReconnect?: boolean;
  reconnectInterval?: number;
};

/**
 * Custom WebSocket hook for streaming real-time data.
 *
 * @template T - Expected shape of incoming message data.
 * @param url - WebSocket server URL.
 * @param onMessage - Callback fired with parsed data.
 * @param options - Optional configs (protocols, autoReconnect, etc.).
 */
export const useWebSocket = <T = any>(
  url: string,
  onMessage: (data: T) => void,
  options?: UseWebSocketOptions
) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      ws.current = new WebSocket(url, options?.protocols);

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as T;
          onMessage(data);
        } catch (err) {
          console.warn("[WebSocket] Failed to parse message:", event.data);
        }
      };

      ws.current.onclose = () => {
        if (isMounted && options?.autoReconnect) {
          reconnectTimer.current = setTimeout(connect, options.reconnectInterval || 2000);
        }
      };
    };

    connect();

    return () => {
      isMounted = false;
      reconnectTimer.current && clearTimeout(reconnectTimer.current);
      ws.current?.close();
    };
  }, [url, onMessage]);

  return ws;
};
