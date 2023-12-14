import { config } from "@config/index";
import { getTokenFromLocalStorage } from "@redux/localStore/token";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const getBaseQuery = (url: string, accept?: string) => {
  const token = getTokenFromLocalStorage();
  const baseUrl = `${config.BACKEND_URL}/api/${url}`;
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("accept", accept ?? "application/json");
      headers.set("Authorization", `Token ${token}`);
      return headers;
    },
  });
};
