import { config } from "@config/index";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token") || "";
};

export const getBaseQuery = (url: string, accept?: string) => {
  const token = getTokenFromLocalStorage();
  const baseUrl = `${config.BACKEND_URL}/api/${url}`;
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("accept", accept ?? "application/json");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });
};
