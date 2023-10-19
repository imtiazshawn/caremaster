import { createApi } from "@reduxjs/toolkit/query/react";

import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
} from "$types/auth";

import { getBaseQuery } from "./apiUtils";

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
