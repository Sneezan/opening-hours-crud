import { parse } from "date-fns";

// Utils to parse strings to Date type.
export const parseRuleDates = (
  startDate: string,
  endDate: string,
  startTime: string,
  endTime: string,
) => {
  const sDate = parse(startDate, "yyyy-MM-dd", new Date());
  const eDate = parse(endDate, "yyyy-MM-dd", new Date());
  const sTime = parse(startTime, "HH:mm", new Date(1970, 0, 1));
  const eTime = parse(endTime, "HH:mm", new Date(1970, 0, 1));

  return { startDate: sDate, endDate: eDate, startTime: sTime, endTime: eTime };
};
