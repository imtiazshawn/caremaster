import dayjs from "dayjs";

export const formatDateForBackend = (date: Date) => {
  return dayjs(date).format("DD-MM-YYYY");
};

export const formatTimeForBackend = (date: Date) => {
  return dayjs(date).format("hh:mm A");
};
