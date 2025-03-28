import React, { useEffect, useState } from 'react';

export default function MarketTicker() {
  const [price, setPrice] = useState('0.00');

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/market-data/binance');
        const data = await res.json();
        setPrice(parseFloat(data.last).toFixed(2));
      } catch (e) {
        console.error('Failed to fetch ticker data', e);
      }
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold">BTC/USDT Ticker</h2>
      <p className="text-2xl mt-2">${price}</p>
    </div>
  );
}
