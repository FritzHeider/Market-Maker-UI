// ENUMS — for reusability and type safety across app

export type OrderSide = "buy" | "sell";
export type OrderType = "market" | "limit";
export type OrderStatus = "pending" | "filled" | "cancelled" | "failed";

// ✅ Optional: constant-style enums for autocomplete-friendly imports
export const ORDER_SIDES = ["buy", "sell"] as const;
export const ORDER_TYPES = ["market", "limit"] as const;
export const ORDER_STATUSES = ["pending", "filled", "cancelled", "failed"] as const;

// 🟦 Price chart data point (for candles/line charts)

export type PricePoint = {
  timestamp: string;  // ISO 8601
  price: number;
  symbol: string;     // e.g., "BTC/USDT"
};

// 🟩 Portfolio structure (frontend display or backend API)

export type Portfolio = {
  balance: number;     // total value in USDT/USD
  pnl: number;         // realized/unrealized profit
  timestamp?: string;  // optional for historical tracking
};

// 🚀 Payload sent from frontend to API for placing an order

export type OrderPayload = {
  side: OrderSide;
  amount: number;
  symbol: string;
  limitPrice?: number;
  type?: OrderType;           // optional — defaults to "market"
  clientOrderId?: string;     // optional — useful for deduplication or UI tracking
};

// 📦 Full order object returned from API or stored in DB

export type Order = {
  id: string;                 // server-generated UUID or DB ID
  amount: number;
  price?: number;             // filled or limit price
  type: OrderType;
  side: OrderSide;
  symbol: string;
  status: OrderStatus;
  createdAt: string;          // ISO timestamp
  filledAt?: string;          // ISO timestamp when filled
  clientOrderId?: string;     // optional, if provided by client
};
