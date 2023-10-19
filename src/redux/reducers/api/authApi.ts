import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./apiUtils";
import {
  LoginResponse,
  LoginCredentials,
  RegisterResponse,
  RegisterCredentials,
} from "$types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: getBaseQuery("auth"),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterCredentials>({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
