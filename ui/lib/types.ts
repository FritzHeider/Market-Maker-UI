// 📦 ENUM TYPES — for reusability and type safety across app

export type OrderSide = "buy" | "sell";
export type OrderType = "market" | "limit";
export type OrderStatus = "pending" | "filled" | "cancelled" | "failed";

// ✅ Constant-style enums — for filters, selects, and validation
export const ORDER_SIDES = ["buy", "sell"] as const;
export const ORDER_TYPES = ["market", "limit"] as const;
export const ORDER_STATUSES = [
  "pending",
  "filled",
  "cancelled",
  "failed",
] as const;

export type OrderSideEnum = (typeof ORDER_SIDES)[number];
export type OrderTypeEnum = (typeof ORDER_TYPES)[number];
export type OrderStatusEnum = (typeof ORDER_STATUSES)[number];

// 🟦 Price chart data point (candles or lines)
export type PricePoint = {
  timestamp: string; // ISO 8601
  price: number;
  symbol: string; // e.g., "BTC/USDT"
};

// 🟩 Portfolio structure (used in dashboard, widgets, etc.)
export type Portfolio = {
  balance: number; // total account value in USDT/USD
  pnl: number; // total profit or loss
  timestamp?: string; // optional snapshot timestamp
};

// 🚀 Payload sent from UI to order API
export type OrderPayload = {
  side: "buy" | "sell";
  amount: number;
  symbol: string;
  limitPrice?: number;
  type?: "market" | "limit";
  clientOrderId?: string;
  takeProfit?: number;
  stopLoss?: number;
};


// 📄 Full order object (returned by API or stored in DB)
export type Order = {
  id: string; // unique UUID from backend
  amount: number;
  price?: number; // executed or limit price
  type: OrderType;
  side: OrderSide;
  symbol: string;
  status: OrderStatus;
  createdAt: string; // ISO string
  filledAt?: string; // optional
  clientOrderId?: string; // optional (frontend-generated ID)
};
