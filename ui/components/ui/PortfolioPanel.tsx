import React, { useEffect, useState } from "react";

export default function PortfolioPanel() {
  const [portfolio, setPortfolio] = useState({ balance: 0, pnl: 0 });

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/portfolio");
        const data = await res.json();
        setPortfolio(data);
      } catch (e) {
        console.error("Failed to fetch portfolio", e);
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <div className="bg-black text-white p-4 rounded-xl shadow space-y-2">
      <h2 className="text-lg font-bold">Portfolio</h2>
      <div className="flex justify-between">
        <span>Balance</span>
        <span>${portfolio.balance.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>PnL</span>
        <span
          className={portfolio.pnl >= 0 ? "text-green-400" : "text-red-400"}
        >
          {portfolio.pnl >= 0 ? "+" : ""}${portfolio.pnl.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
