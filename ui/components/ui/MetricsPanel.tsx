"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
  ChartData,
} from "chart.js";
import { toast } from "sonner";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface Metrics {
  portfolioValue: number;
  openOrders: number;
  activeStrategies: number;
  pnl24h: number;
}

interface DashboardMessage {
  dashboardMetrics: Metrics;
}

export default function MetricsPanel() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [pnlClass, setPnlClass] = useState("");
  const [history, setHistory] = useState<number[]>([]);
  const previousPnlRef = useRef<number | null>(null);

  const { lastJsonMessage, readyState } = useWebSocket<DashboardMessage>(
    "wss://your-ws-endpoint",
    {
      shouldReconnect: () => true,
    }
  );

  const statusLabel = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Connected",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Disconnected",
    [ReadyState.UNINSTANTIATED]: "Idle",
  };

  const statusColor =
    readyState === ReadyState.OPEN ? "text-green-400" : "text-yellow-400";

  const computeSMA = useCallback((arr: number[], window = 5): number[] => {
    return arr.map((_, i, a) => {
      const slice = a.slice(Math.max(i - window + 1, 0), i + 1);
      return slice.reduce((sum, val) => sum + val, 0) / slice.length;
    });
  }, []);

  useEffect(() => {
    if (lastJsonMessage?.dashboardMetrics) {
      const newMetrics = lastJsonMessage.dashboardMetrics;
      setMetrics(newMetrics);

      // Show toast on large PnL drop
      if (
        previousPnlRef.current !== null &&
        newMetrics.pnl24h < -10 &&
        previousPnlRef.current >= -10
      ) {
        toast({
          title: "📉 Warning",
          description: "24h PnL dropped below -10%",
          variant: "error",
        });
      }

      previousPnlRef.current = newMetrics.pnl24h;

      setPnlClass(
        newMetrics.pnl24h > 0
          ? "from-green-700 to-green-500"
          : newMetrics.pnl24h < 0
          ? "from-red-700 to-red-500"
          : "from-blue-800 to-blue-600"
      );

      setHistory((prev) => {
        const updated = [...prev.slice(-29), newMetrics.pnl24h];
        localStorage.setItem("metricsHistory", JSON.stringify(updated));
        return updated;
      });
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("metricsHistory");
      if (saved) setHistory(JSON.parse(saved));
    } catch {
      console.warn("Failed to parse metricsHistory from localStorage.");
    }
  }, []);

  if (!metrics) {
    return <p className="text-blue-100 text-sm">Loading metrics...</p>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pnlClass}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-br ${pnlClass} p-4 rounded-xl shadow-inner`}
      >
        <div className="absolute top-2 right-3 text-xs text-gray-200">
          <span className={`flex items-center gap-1 ${statusColor}`}>
            {readyState === ReadyState.OPEN ? (
              <Wifi className="w-3 h-3" />
            ) : (
              <WifiOff className="w-3 h-3" />
            )}
            {statusLabel[readyState]}
          </span>
        </div>

        <MetricBox
          label="Portfolio Value"
          value={metrics.portfolioValue}
          prefix="$"
          icon={<TrendingUp className="w-5 h-5 text-blue-300" />}
        />
        <MetricBox
          label="Open Orders"
          value={metrics.openOrders}
          icon={<Activity className="w-5 h-5 text-blue-300" />}
        />
        <MetricBox
          label="Active Strategies"
          value={metrics.activeStrategies}
          icon={<TrendingUp className="w-5 h-5 text-blue-300" />}
        />
        <MetricBox
          label="24h PnL"
          value={metrics.pnl24h}
          suffix="%"
          isPnl
          highlight={metrics.pnl24h >= 0 ? "text-green-300" : "text-red-400"}
          icon={
            metrics.pnl24h >= 0 ? (
              <TrendingUp className="w-5 h-5" />
            ) : (
              <TrendingDown className="w-5 h-5" />
            )
          }
          history={history}
          trendline={computeSMA(history)}
        />
      </motion.div>
    </AnimatePresence>
  );
}

type MetricBoxProps = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  highlight?: string;
  isPnl?: boolean;
  icon?: React.ReactNode;
  history?: number[];
  trendline?: number[];
};

function MetricBox({
  label,
  value,
  prefix = "",
  suffix = "",
  highlight = "text-white",
  isPnl = false,
  icon,
  history = [],
  trendline = [],
}: MetricBoxProps) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20 });
  const formatted = useTransform(spring, (v) =>
    `${prefix}${v.toFixed(isPnl ? 2 : 0)}${suffix}`
  );

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  const chartData: ChartData<"line"> = useMemo(
    () => ({
      labels: history.map((_, i) => i.toString()),
      datasets: [
        {
          data: history,
          borderColor: highlight,
          backgroundColor: "transparent",
          pointRadius: 0,
          tension: 0.3,
        },
        ...(trendline.length
          ? [
              {
                data: trendline,
                borderColor: "#94a3b8",
                borderDash: [4, 4],
                pointRadius: 0,
                tension: 0.3,
              },
            ]
          : []),
      ],
    }),
    [history, trendline, highlight]
  );

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      line: { borderWidth: 2 },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="text-center">
      <p className="text-sm text-blue-200 flex items-center justify-center gap-2">
        {icon} <span>{label}</span>
      </p>
      <motion.p className={`text-2xl font-bold ${highlight}`}>
        {formatted}
      </motion.p>
      {history.length > 2 && (
        <div className="mt-1 h-12">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}
