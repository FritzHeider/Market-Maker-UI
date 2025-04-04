import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { Portfolio } from "@/lib/types";

export const usePortfolio = () => {
  return useQuery<Portfolio, Error>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const result = await get<Portfolio>("/portfolio");
      if (result.error) throw new Error(result.error);
      return result.data!;
    },
    refetchInterval: 10_000, // auto-refresh every 10s
    refetchOnWindowFocus: true, // refresh on tab focus
    staleTime: 5_000, // cache for 5s before refetch
    retry: 1, // retry once on failure
  });
};
