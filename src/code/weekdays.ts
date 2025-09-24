export enum Weekdays {
  All = 0b1111111, // 127 in decimal
  Monday = 0b0000001, // 1
  Tuesday = 0b0000010, // 2
  Wednesday = 0b0000100, // 4
  Thursday = 0b0001000, // 8
  Friday = 0b0010000, // 16
  Saturday = 0b0100000, // 32
  Sunday = 0b1000000, // 64
}

// Helper function to convert weekdays bit flags to array of Weekdays enums
export const getWeekdayEnums = (weekdays: Weekdays): Weekdays[] => {
  return [
    Weekdays.Monday,
    Weekdays.Tuesday,
    Weekdays.Wednesday,
    Weekdays.Thursday,
    Weekdays.Friday,
    Weekdays.Saturday,
    Weekdays.Sunday,
  ].filter((day) => weekdays & day);
};

// Helper function to convert weekdays bit flags to readable day names using bitmap
export const getWeekdayNames = (weekdays: Weekdays): string[] => {
  return getWeekdayEnums(weekdays).map((day) => getWeekdayName(day));
};

// Helper function to get weekday name from enum
export const getWeekdayName = (weekday: Weekdays): string => {
  switch (weekday) {
    case Weekdays.Monday:
      return "Monday";
    case Weekdays.Tuesday:
      return "Tuesday";
    case Weekdays.Wednesday:
      return "Wednesday";
    case Weekdays.Thursday:
      return "Thursday";
    case Weekdays.Friday:
      return "Friday";
    case Weekdays.Saturday:
      return "Saturday";
    case Weekdays.Sunday:
      return "Sunday";
    default:
      return "";
  }
};

// Helper function to get weekday data for forms
export const getWeekdayFormData = () => {
  return [
    Weekdays.Monday,
    Weekdays.Tuesday,
    Weekdays.Wednesday,
    Weekdays.Thursday,
    Weekdays.Friday,
    Weekdays.Saturday,
    Weekdays.Sunday,
  ].map((day) => ({
    value: day,
    label: getWeekdayName(day),
    id: getWeekdayName(day).toLowerCase(),
  }));
};
