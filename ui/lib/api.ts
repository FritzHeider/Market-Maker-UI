// File: /lib/api.ts

import type { Order, OrderPayload, Portfolio, PricePoint } from "@/lib/types";

/**
 * Standardized API response wrapper
 */
type ApiResponse<T> = {
  data?: T;
  error?: string;
};

/**
 * Shared fetch for external/public APIs (e.g. from NEXT_PUBLIC_API_URL)
 */
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) return { error: "Missing NEXT_PUBLIC_API_URL" };

  try {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const body = isJson ? await res.json() : null;

    if (!res.ok) {
      return {
        error: body?.error || `Request failed: ${res.status}`,
      };
    }

    return { data: body as T };
  } catch (err: any) {
    return { error: err?.message || "Unknown API fetch error" };
  }
}

/**
 * POST handler for internal routes like /api/orders
 */
async function internalPost<T>(
  endpoint: string,
  payload: unknown
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const body = isJson ? await res.json() : null;

    if (!res.ok) {
      return { error: body?.error || `Request failed: ${res.status}` };
    }

    return { data: body as T };
  } catch (err: any) {
    return { error: err?.message || "Unknown internal API error" };
  }
}

/**
 * Fetch historical price data
 */
export const fetchPrices = async (): Promise<ApiResponse<PricePoint[]>> => {
  return apiFetch("/historical-prices");
};

/**
 * Fetch current portfolio (balance + PnL)
 */
export const fetchPortfolio = async (): Promise<ApiResponse<Portfolio>> => {
  return apiFetch("/portfolio");
};

/**
 * Place an order via internal API route
 */
export const placeOrder = async (
  payload: OrderPayload
): Promise<ApiResponse<{ success: boolean; order?: Order }>> => {
  return internalPost("/api/orders", payload);
};
