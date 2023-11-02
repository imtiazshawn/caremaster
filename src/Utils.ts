import dayjs from "dayjs";

interface AnyRecord {
  [key: string]: any;
}

export const formatDate = (date: Date, format = "MM/DD/YYYY") => {
  return dayjs(date).format(format);
};

export const getImageURL = (file: string | File | undefined) => {
  if (!file) {
    return null;
  }
  if (typeof file === "string") {
    return file;
  }
  return URL.createObjectURL(file);
};

export const removeUndefined = <T extends AnyRecord>(obj: T): T => {
  try {
    if (!obj || typeof obj !== "object") {
      return obj;
    }

    if (Array.isArray(obj)) {
      obj.forEach((item: object, index) => {
        obj[index] = removeUndefined(item);
      });
      return obj.filter((item: object) => Object.keys(item).length) as any;
    }

    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined || obj[key] === null) {
        delete obj[key];
      } else if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      } else if (typeof obj[key] === "object") {
        obj[key as keyof T] = removeUndefined(obj[key]);
      }
    });

    return obj;
  } catch {
    return obj;
  }
};
