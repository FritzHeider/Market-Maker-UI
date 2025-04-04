import type { Order, OrderPayload } from "@/lib/types";

export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

const DEFAULT_TIMEOUT = 8000;

const withTimeout = (ms: number): AbortController => {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), ms);
  return controller;
};

const isJsonResponse = (res: Response) =>
  res.headers.get("content-type")?.includes("application/json");

const handleResponse = async <T>(res: Response): Promise<ApiResponse<T>> => {
  const body = isJsonResponse(res) ? await res.json() : null;

  if (!res.ok) {
    return {
      error: body?.error || `Request failed: ${res.status}`,
    };
  }

  return { data: body as T };
};

const handleError = (err: unknown): ApiResponse<never> => {
  if (err instanceof DOMException && err.name === "AbortError") {
    return { error: "Request timed out" };
  }
  if (err instanceof Error) {
    return { error: err.message };
  }
  return { error: "Unexpected error occurred" };
};

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method: RequestMethod;
  endpoint: string;
  payload?: unknown;
  timeout?: number;
  headers?: Record<string, string>;
  baseUrl?: string;
}

const request = async <T>({
  method,
  endpoint,
  payload,
  timeout = DEFAULT_TIMEOUT,
  headers = {},
  baseUrl = process.env.NEXT_PUBLIC_API_URL,
}: RequestOptions): Promise<ApiResponse<T>> => {
  const controller = withTimeout(timeout);

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      signal: controller.signal,
      body: ["POST", "PUT"].includes(method)
        ? JSON.stringify(payload)
        : undefined,
    });

    return await handleResponse<T>(res);
  } catch (err) {
    return handleError(err);
  }
};

// 🔁 Generic HTTP Methods
export const get = <T>(
  endpoint: string,
  timeout?: number,
  baseUrl?: string,
  headers?: Record<string, string>,
) => request<T>({ method: "GET", endpoint, timeout, baseUrl, headers });

export const post = <T>(
  endpoint: string,
  payload: unknown,
  timeout?: number,
  baseUrl?: string,
  headers?: Record<string, string>,
) =>
  request<T>({ method: "POST", endpoint, payload, timeout, baseUrl, headers });

export const put = <T>(
  endpoint: string,
  payload: unknown,
  timeout?: number,
  baseUrl?: string,
  headers?: Record<string, string>,
) =>
  request<T>({ method: "PUT", endpoint, payload, timeout, baseUrl, headers });

export const del = <T>(
  endpoint: string,
  timeout?: number,
  baseUrl?: string,
  headers?: Record<string, string>,
) => request<T>({ method: "DELETE", endpoint, timeout, baseUrl, headers });

// 🧠 Business-specific method
export const placeOrder = async (payload: OrderPayload) => {
  return await post<{ success: boolean; order?: Order }>("/orders", payload);
};
