import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { PricePoint } from "@/lib/types";

export const usePrices = () => {
  return useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const result = await get<PricePoint[]>("/historical-prices");
      if (result.error) throw new Error(result.error);
      return result.data!;
    },
    refetchInterval: 5_000, // optional: refresh every 5s
  });
};
