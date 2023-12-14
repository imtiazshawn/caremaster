import { createApi } from "@reduxjs/toolkit/query/react";

import {
  LoginCredentials,
  RegisterCredentials,
  RegisterResponse,
} from "$types/auth";

import { ApiResponse } from "$types/index";
import { getBaseQuery } from "./apiUtils";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: getBaseQuery("sign-in"),
  endpoints: (builder) => ({
    signIn: builder.mutation<
      {
        type: "success" | "error";
        message: string;
        token: string;
      },
      LoginCredentials
    >({
      query: (credentials) => ({
        url: "",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: ApiResponse<string>) => {
        return {
          type: "success",
          message: "Successfully logged in",

          token: response.response,
        };
      },
      transformErrorResponse: () => {
        return {
          type: "error",
          message: "Wrong username or password",
          token: "",
        };
      },
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

export const { useSignInMutation, useRegisterMutation } = authApi;
