import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { Order } from "@/lib/types";

export const useRecentOrders = () => {
  return useQuery({
    queryKey: ["recentOrders"],
    queryFn: async () => {
      const result = await get<Order[]>("/orders?limit=5"); // adjust backend route as needed
      if (result.error) throw new Error(result.error);
      return result.data!;
    },
    refetchInterval: 10_000, // optional auto-refresh every 10s
  });
};
