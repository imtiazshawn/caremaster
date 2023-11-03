import { createApi } from "@reduxjs/toolkit/query/react";

import {
  CareWorker,
  CareWorkerResponse,
  CareWorkersResponse,
  CreateCareWorker,
  CreateCareWorkersResponse,
  UpdateCareWorkerReq,
} from "$types/careWorkers";

import { getBaseQuery } from "./apiUtils";

export const careWorkersApi = createApi({
  reducerPath: "careWorkersApi",
  baseQuery: getBaseQuery("care-workers"),
  endpoints: (builder) => ({
    getCareWorkers: builder.query<CareWorker[], null>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (res: CareWorkersResponse) => {
        return res.response.data;
      },
    }),
    getCareWorker: builder.query<CareWorker, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (res: CareWorkerResponse) => {
        return res.response;
      },
    }),
    createCareWorker: builder.mutation<
      CreateCareWorkersResponse,
      CreateCareWorker
    >({
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
    updateCareWorker: builder.mutation<
      CreateCareWorkersResponse,
      UpdateCareWorkerReq
    >({
      query(careWorker) {
        const bodyFormData = new FormData();
        Object.entries(careWorker).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: `/${careWorker.id}`,
          method: "PATCH",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useGetCareWorkersQuery,
  useGetCareWorkerQuery,
  useCreateCareWorkerMutation,
  useUpdateCareWorkerMutation,
} = careWorkersApi;
