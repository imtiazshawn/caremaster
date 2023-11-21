import dayjs from "dayjs";

export const formatDateForBackend = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const formatTimeForBackend = (date: Date) => {
  return dayjs(date).format("HH:mm");
};
