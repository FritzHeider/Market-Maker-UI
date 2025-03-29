// File: /components/ui/MetricsPanel.tsx

import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface Metrics {
  portfolioValue: number;
  openOrders: number;
  activeStrategies: number;
  pnl24h: number;
}

export default function MetricsPanel() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [pnlClass, setPnlClass] = useState<string>("");
  const [history, setHistory] = useState<number[]>([]);

  const { lastJsonMessage } = useWebSocket("wss://your-ws-endpoint", {
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastJsonMessage && lastJsonMessage.dashboardMetrics) {
      const newMetrics = lastJsonMessage.dashboardMetrics as Metrics;
      setMetrics(newMetrics);
      setPnlClass(
        newMetrics.pnl24h > 0 ? "from-green-700 to-green-500" : newMetrics.pnl24h < 0 ? "from-red-700 to-red-500" : "from-blue-800 to-blue-600"
      );
      setHistory((prev) => [...prev.slice(-29), newMetrics.pnl24h]);
    }
  }, [lastJsonMessage]);

  if (!metrics) {
    return (
      <div className="text-blue-100 text-sm">Loading metrics...</div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pnlClass}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-br ${pnlClass} p-4 rounded-xl shadow-inner`}
      >
        <MetricBox label="Total Portfolio Value" value={metrics.portfolioValue} prefix="$" icon={<TrendingUp className="w-5 h-5 text-blue-300" />} />
        <MetricBox label="Open Orders" value={metrics.openOrders} icon={<Activity className="w-5 h-5 text-blue-300" />} />
        <MetricBox label="Active Strategies" value={metrics.activeStrategies} icon={<TrendingUp className="w-5 h-5 text-blue-300" />} />
        <MetricBox
          label="24h PnL"
          value={metrics.pnl24h}
          suffix="%"
          isPnl
          highlight={metrics.pnl24h >= 0 ? "text-green-300" : "text-red-400"}
          icon={metrics.pnl24h >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
          history={history}
        />
      </motion.div>
    </AnimatePresence>
  );
}

function MetricBox({ label, value, prefix = "", suffix = "", highlight = "text-white", isPnl = false, icon, history = [] }: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  highlight?: string;
  isPnl?: boolean;
  icon?: React.ReactNode;
  history?: number[];
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = setInterval(() => {
      setDisplayValue((prev) => {
        const diff = value - prev;
        if (Math.abs(diff) < 0.5) return value;
        return prev + diff * 0.2;
      });
    }, 50);
    return () => clearInterval(controls);
  }, [value]);

  const chartData = {
    labels: history.map((_, i) => i.toString()),
    datasets: [
      {
        data: history,
        borderColor: highlight ?? "#60A5FA",
        backgroundColor: "transparent",
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { borderWidth: 2 },
    },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  return (
    <div className="text-center">
      <p className="text-sm text-blue-200 flex items-center justify-center gap-2">
        {icon} <span>{label}</span>
      </p>
      <p className={`text-2xl font-bold ${highlight}`}>{`${prefix}${displayValue.toFixed(isPnl ? 2 : 0)}${suffix}`}</p>
      {history.length > 2 && (
        <div className="mt-1 h-12">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}