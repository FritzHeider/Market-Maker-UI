/**
 * Format a number into a localized currency string.
 * Example: formatCurrency(1234.5) → "$1,234.50"
 */
export const formatCurrency = (
  value: number,
  currency: string = "USD",
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Format a timestamp as relative "time ago" (localized)
 * Example: timeAgo("2024-12-01T12:00:00Z") → "3 hours ago"
 */
export const timeAgo = (
  timestamp: string,
  locale: string = "en-US",
  style: Intl.RelativeTimeFormatStyle = "short"
): string => {
  const then = new Date(timestamp).getTime();
  const now = Date.now();
  const diff = then - now;

  if (isNaN(then)) return "Invalid date";

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style });

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / (86400000 * 7));
  const months = Math.floor(diff / (86400000 * 30));
  const years = Math.floor(diff / (86400000 * 365));

  const abs = Math.abs;

  if (abs(seconds) < 60) return rtf.format(Math.round(seconds), "second");
  if (abs(minutes) < 60) return rtf.format(Math.round(minutes), "minute");
  if (abs(hours) < 24) return rtf.format(Math.round(hours), "hour");
  if (abs(days) < 7) return rtf.format(Math.round(days), "day");
  if (abs(weeks) < 4) return rtf.format(Math.round(weeks), "week");
  if (abs(months) < 12) return rtf.format(Math.round(months), "month");

  return rtf.format(Math.round(years), "year");
};
