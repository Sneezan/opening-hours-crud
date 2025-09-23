import { format, parse } from "date-fns";

// Format Date objects to strings for JSON output
export const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");
export const formatTime = (date: Date): string => format(date, "HH:mm:ss");

// Parse form strings to Date due to Date type is not string
export const parseDate = (dateString: string): Date => parse(dateString, "yyyy-MM-dd", new Date());
export const parseTime = (timeString: string): Date => {
  const normalized = timeString.length === 5 ? `${timeString}:00` : timeString;
  return parse(normalized, "HH:mm:ss", new Date(1970, 0, 1));
};
