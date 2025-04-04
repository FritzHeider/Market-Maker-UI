"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartData, ChartOptions } from "chart.js";
import "chart.js/auto";

type PricePoint = {
  timestamp: string;
  price: number;
};

export default function PriceChart() {
  const [chartData, setChartData] = useState<ChartData<"line">>({
    labels: [],
    datasets: [],
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchChart = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/historical-prices`,
      );
      if (!res.ok) throw new Error("Failed to fetch price data");

      const prices: PricePoint[] = await res.json();

      const labels = prices.map((p) =>
        new Date(p.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
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
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      console.error("Chart data fetch failed:", message);
      setError("Error loading chart data: " + message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChart();
    const interval = setInterval(fetchChart, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, [fetchChart]);

  const options: ChartOptions<"line"> = {
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
  };

  const hasData = chartData.datasets.length > 0 && chartData.labels?.length;

  return (
    <div className="bg-black text-white p-4 rounded-xl shadow-md w-full">
      <h2 className="text-lg font-semibold mb-4">📊 Price Chart (BTC/USDT)</h2>

      {error && <p className="text-red-400">{error}</p>}
      {loading || !hasData ? (
        <p className="text-gray-400">Loading chart...</p>
      ) : (
        <div className="h-64">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}
