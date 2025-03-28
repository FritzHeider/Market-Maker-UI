export type PricePoint = {
  timestamp: string;
  price: number;
};

export type Portfolio = {
  balance: number;
  pnl: number;
};

export type Order = {
  id: string;
  amount: number;
  price?: number;
  type: "buy" | "sell";
};
