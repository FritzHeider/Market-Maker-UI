"use client";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

type PricePoint = {
  timestamp: string;
  price: number;
};

export default function PriceChart() {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/historical-prices`,
        );
        if (!res.ok) throw new Error("Failed to fetch price data");

        const prices: PricePoint[] = await res.json();

        const labels = prices.map((p) =>
          new Date(p.timestamp).toLocaleTimeString(),
        );
        const data = prices.map((p) => p.price);

        setChartData({
          labels,
          datasets: [
            {
              label: "BTC/USDT",
              data,
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              fill: true,
              tension: 0.3,
              pointRadius: 0,
            },
          ],
        });
        setError(null);
      } catch (err: any) {
        console.error("Chart data fetch failed:", err.message);
        setError("Error loading chart data.");
      }
    };

    fetchChart();
    const interval = setInterval(fetchChart, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">📊 Price Chart (BTC/USDT)</h2>

      {error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  color: "#fff",
                },
              },
            },
            scales: {
              x: {
                ticks: { color: "#aaa" },
              },
              y: {
                ticks: { color: "#aaa" },
              },
            },
          }}
          height={250}
        />
      )}
    </div>
  );
}
