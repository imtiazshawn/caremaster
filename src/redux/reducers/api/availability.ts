import { Availability, AvailabilityGet } from "$types/Availability";
import { ApiResponseArray } from "$types/index";
import { getBaseQuery } from "@reducers/api/apiUtils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const careWorkerAvailabilityApi = createApi({
  reducerPath: "careWorkerAvailabilityApi",
  baseQuery: getBaseQuery("care-worker-availabilities"),
  endpoints: (builder) => ({
    getCareWorkerAvailabilities: builder.query<
      AvailabilityGet[],
      number | undefined
    >({
      query: (id) => ({
        url: id ? `?care_worker=${id}` : "",
        method: "get",
      }),
      transformResponse: (response: ApiResponseArray<AvailabilityGet>) => {
        return response.response.data;
      },
    }),
    createCareWorkerAvailabilities: builder.mutation<
      void,
      {
        care_worker: number;
        availabilities: Availability[];
      }
    >({
      query: (data) => {
        return {
          url: "",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
  }),
});

export const {
  useCreateCareWorkerAvailabilitiesMutation,
  useGetCareWorkerAvailabilitiesQuery,
} = careWorkerAvailabilityApi;
