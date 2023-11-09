import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token") || "";
};

const testApiUrl = "https://care.mubeendroid.com";

export const getBaseQuery = (url: string, accept?: string) => {
  const token = getTokenFromLocalStorage();
  const baseUrl = `${
    import.meta.env.CAREMASTER_BACKEND_URL || testApiUrl
  }/api/${url}`;
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("accept", accept ?? "application/json");
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  });
};
