import { createApi } from "@reduxjs/toolkit/query/react";

import { CareWorkersResponse } from "$types/careWorkers";

import { getBaseQuery } from "./apiUtils";

export const careWorkersApi = createApi({
  reducerPath: "careWorkersApi",
  baseQuery: getBaseQuery("care-workers"),
  endpoints: (builder) => ({
    getCareWorkers: builder.query<CareWorkersResponse, null>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCareWorkersQuery } = careWorkersApi;
