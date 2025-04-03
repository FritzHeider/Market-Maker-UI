import { useEffect, useRef } from "react";

type UseWebSocketOptions = {
  protocols?: string | string[];
  autoReconnect?: boolean;
  reconnectInterval?: number;
  onOpen?: (ws: WebSocket) => void;
  onClose?: () => void;
  onError?: (error: unknown) => void;
};

/**
 * Custom WebSocket hook with reconnect, lifecycle, and message parsing.
 *
 * @template T - Type of expected message payload.
 * @param url - WebSocket server URL
 * @param onMessage - Message callback
 * @param options - Optional WebSocket settings
 */
export const useWebSocket = <T = unknown>(
  url: string,
  onMessage: (data: T) => void,
  options?: UseWebSocketOptions
) => {
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);

  const {
    protocols,
    autoReconnect,
    reconnectInterval,
    onOpen,
    onClose,
    onError,
  } = options ?? {};

  useEffect(() => {
    let isMounted = true;

    const connect = () => {
      ws.current = new WebSocket(url, protocols);

      ws.current.onopen = () => {
        onOpen?.(ws.current as WebSocket);
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as T;
          onMessage(data);
        } catch (err: unknown) {
          console.warn("[WebSocket] Failed to parse:", event.data);
          onError?.(err);
        }
      };

      ws.current.onerror = (e) => {
        onError?.(e);
      };

      ws.current.onclose = () => {
        onClose?.();

        if (isMounted && autoReconnect) {
          reconnectTimer.current = setTimeout(connect, reconnectInterval || 2000);
        }
      };
    };

    connect();

    return () => {
      isMounted = false;
      if (reconnectTimer.current) {
        clearTimeout(reconnectTimer.current);
      }
      ws.current?.close();
    };
  }, [
    url,
    protocols,
    autoReconnect,
    reconnectInterval,
    onMessage,
    onOpen,
    onClose,
    onError,
  ]);

  return ws;
};
