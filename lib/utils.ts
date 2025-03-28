export const formatCurrency = (value: number): string =>
  `$${value.toFixed(2).toLocaleString()}`;

export const timeAgo = (timestamp: string): string => {
  const diff = Date.now() - new Date(timestamp).getTime();
  return `${Math.floor(diff / 1000)}s ago`;
};
