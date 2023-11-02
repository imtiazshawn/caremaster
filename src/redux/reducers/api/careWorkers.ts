import { createApi } from "@reduxjs/toolkit/query/react";

import { CareWorker, CareWorkersResponse } from "$types/careWorkers";

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
    createCareWorker: builder.mutation<CareWorkersResponse, CareWorker>({
      query: (careWorker) => {
        const bodyFormData = new FormData();
        Object.entries(careWorker).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: "",
          method: "POST",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
});

export const { useGetCareWorkersQuery, useCreateCareWorkerMutation } =
  careWorkersApi;
