import { createApi } from "@reduxjs/toolkit/query/react";

import { ServiceUsersResponse } from "$types/serviceUsers";

import { getBaseQuery } from "./apiUtils";

export const serviceUsersApi = createApi({
  reducerPath: "serviceUsersApi",
  baseQuery: getBaseQuery("service-users"),
  endpoints: (builder) => ({
    getServiceUsers: builder.query<ServiceUsersResponse, null>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetServiceUsersQuery } = serviceUsersApi;
