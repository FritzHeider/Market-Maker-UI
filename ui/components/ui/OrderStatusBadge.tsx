"use client";

import clsx from "clsx";
import type { OrderStatus } from "@/lib/types";

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const color = {
    pending: "bg-yellow-500",
    filled: "bg-green-600",
    cancelled: "bg-gray-500",
    failed: "bg-red-600",
  }[status];

  return (
    <span
      className={clsx(
        "text-xs px-2 py-0.5 rounded-full font-medium text-white uppercase tracking-wide",
        color
      )}
    >
      {status}
    </span>
  );
}
