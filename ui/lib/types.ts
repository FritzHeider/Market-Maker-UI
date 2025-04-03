// 📦 ENUM TYPES — for reusability and type safety across app

export type OrderSide = "buy" | "sell";
export type OrderType = "market" | "limit";
export type OrderStatus = "pending" | "filled" | "cancelled" | "failed";

// ✅ Constant-style enums — for UI filters, dropdowns, etc.
export const ORDER_SIDES = ["buy", "sell"] as const;
export const ORDER_TYPES = ["market", "limit"] as const;
export const ORDER_STATUSES = [
  "pending",
  "filled",
  "cancelled",
  "failed",
] as const;

// 🟦 Price chart data point (candles or lines)

export type PricePoint = {
  timestamp: string; // ISO 8601
  price: number;
  symbol: string; // e.g., "BTC/USDT"
};

// 🟩 Portfolio data used on dashboard

export type Portfolio = {
  balance: number; // total account value in USDT/USD
  pnl: number; // total profit or loss
  timestamp?: string; // optional snapshot timestamp
};

// 🚀 Payload sent to API when placing an order

export type OrderPayload = {
  side: OrderSide;
  amount: number;
  symbol: string;
  limitPrice?: number;
  type?: OrderType; // optional (defaults to "market")
  clientOrderId?: string; // optional (for deduplication/tracking)
};

// 📄 Order object returned from API or stored in DB

export type Order = {
  id: string; // backend-generated unique ID
  amount: number;
  price?: number; // actual executed price
  type: OrderType;
  side: OrderSide;
  symbol: string;
  status: OrderStatus;
  createdAt: string; // ISO 8601
  filledAt?: string; // optional
  clientOrderId?: string; // optional (if user-supplied)
};
