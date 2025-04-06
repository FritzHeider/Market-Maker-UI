// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ======================
// STYLING UTILITIES
// ======================

/**
 * Merges and optimizes Tailwind CSS classes
 * @example cn("text-red-500", "hover:text-red-700")
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ======================
// FORMATTING UTILITIES
// ======================

/**
 * Formats a number as currency
 * @example formatCurrency(1234.56) → "$1,234.56"
 */
export function formatCurrency(
  value: number,
  options: {
    currency?: string;
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string {
  const {
    currency = "USD",
    locale = "en-US",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * Formats a date as relative time (time ago)
 * @example timeAgo("2024-01-01T12:00:00Z") → "3 hours ago"
 */
export function timeAgo(
  timestamp: string | Date,
  options: {
    locale?: string;
    style?: Intl.RelativeTimeFormatStyle;
  } = {}
): string {
  const { locale = "en-US", style = "short" } = options;
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  const then = date.getTime();
  const now = Date.now();
  const diff = then - now;

  if (isNaN(then)) return "Invalid date";

  const rtf = new Intl.RelativeTimeFormat(locale, { 
    numeric: "auto", 
    style 
  });

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
}

// ======================
// VALIDATION UTILITIES
// ======================

/**
 * Checks if a value is a valid date
 * @example isValidDate(new Date()) → true
 */
export function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

// ======================
// TYPE GUARDS
// ======================

/**
 * Type guard for error objects
 * @example isError(error) → true
 */
export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

// ======================
// COMMON UTILITIES
// ======================

/**
 * Delays execution for a specified time
 * @example await sleep(1000) // waits 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}