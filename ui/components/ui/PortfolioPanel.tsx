"use client";

import { usePortfolio } from "@/lib/hooks/usePortfolio";
import { useRecentOrders } from "@/lib/hooks/useRecentOrders";
import { timeAgo } from "@/lib/utils/format";
import OrderStatusBadge from "@/components/ui/OrderStatusBadge";

export default function PortfolioPanel() {
  const { data, error, isLoading } = usePortfolio();
  const {
    data: orders,
    error: ordersError,
    isLoading: ordersLoading,
  } = useRecentOrders();

  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow space-y-4">
      <h2 className="text-lg font-bold">Portfolio</h2>

      {isLoading && <p className="text-gray-400">Loading portfolio...</p>}
      {error && (
        <p className="text-red-500 text-sm">
          {(error as Error).message || "Failed to load portfolio"}
        </p>
      )}

      {data && (
        <>
          <div className="flex justify-between">
            <span>Balance</span>
            <span>${data.balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>PnL</span>
            <span
              className={data.pnl >= 0 ? "text-green-400" : "text-red-400"}
            >
              {data.pnl >= 0 ? "+" : ""}
              ${data.pnl.toFixed(2)}
            </span>
          </div>
        </>
      )}

      <hr className="border-gray-700" />

      <div>
        <h3 className="text-sm font-semibold mb-2 text-gray-300">
          Recent Orders
        </h3>

        {ordersLoading && <p className="text-gray-400 text-sm">Loading...</p>}
        {ordersError && (
          <p className="text-red-500 text-sm">
            {(ordersError as Error).message || "Failed to load orders"}
          </p>
        )}

        {orders?.length === 0 && (
          <p className="text-gray-500 text-sm italic">No recent orders</p>
        )}

        {orders && (
          <>
            <ul className="space-y-2">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="text-sm flex justify-between items-center text-gray-300"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={
                          order.side === "buy"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {order.side.toUpperCase()}
                      </span>
                      {order.symbol} @ ${order.price?.toFixed(2)}
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>
                  <div className="text-gray-500 text-xs whitespace-nowrap">
                    {timeAgo(order.createdAt)}
                  </div>
                </li>
              ))}
            </ul>

            {/* ✅ Move this outside the loop */}
            <div className="text-right mt-2">
              <a
                href="/orders"
                className="text-xs text-blue-400 hover:underline transition"
              >
                View all orders →
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
