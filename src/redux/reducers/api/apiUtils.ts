import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token");
};

export const getBaseQuery = (url: string) => {
  const token = getTokenFromLocalStorage();
  const baseUrl = `${import.meta.env.CAREMASTER_BACKEND_URL}/api/${url}`;
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });
};
