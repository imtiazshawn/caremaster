import dayjs from "dayjs";

export const diffInMinutes = (
  date1?: Date | number,
  date2?: Date | number,
): number => {
  if (!date1 || !date2) {
    return 0;
  }
  if (date1 < date2) {
    return diffInMinutes(date2, date1);
  }
  return dayjs(date1).diff(dayjs(date2), "minute");
};
