import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

export default function PriceChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/historical-prices');
        const prices = await res.json();
        const labels = prices.map((p) => new Date(p.timestamp).toLocaleTimeString());
        const data = prices.map((p) => p.price);
        setChartData({
          labels,
          datasets: [
            {
              label: 'BTC/USDT',
              data,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            },
          ],
        });
      } catch (e) {
        console.error('Chart data fetch failed', e);
      }
    };
    fetchChart();
  }, []);

  return (
    <div className="bg-black text-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-bold mb-2">Price Chart</h2>
      <Line data={chartData} />
    </div>
  );
}
