export const fetchPrices = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/historical-prices`);
  if (!res.ok) throw new Error("Failed to fetch prices");
  return res.json();
};

export const fetchPortfolio = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`);
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return res.json();
};
