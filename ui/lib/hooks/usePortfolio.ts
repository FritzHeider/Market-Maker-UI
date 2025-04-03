import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { Portfolio } from "@/lib/types";

export const usePortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const result = await get<Portfolio>("/portfolio");
      if (result.error) throw new Error(result.error);
      return result.data!;
    },
    refetchInterval: 10_000, // auto-refresh every 10s (optional)
  });
};
