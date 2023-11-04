import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponseArray } from "$types/index";
import { Record, RecordDTO } from "$types/record";
import { getBaseQuery } from "./apiUtils";

type RecordsResponse = ApiResponseArray<Record>;

export const recordsApi = createApi({
  reducerPath: "recordsApi",
  baseQuery: getBaseQuery("records"),
  endpoints: (builder) => ({
    getRecords: builder.query<Record[], null>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (response: RecordsResponse) => {
        return response.response.data;
      },
    }),
    createRecord: builder.mutation<number, RecordDTO>({
      query: (record) => {
        const bodyFormData = new FormData();
        Object.entries(record).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: "",
          method: "POST",
          body: bodyFormData,
          formData: true,
        };
      },
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
    updateRecord: builder.mutation<number, RecordDTO & { id: number }>({
      query: (record) => {
        const bodyFormData = new FormData();
        Object.entries(record).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: record.id.toString(),
          method: "PUT",
          body: bodyFormData,
          formData: true,
        };
      },
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
    deleteRecord: builder.mutation<number, number>({
      query: (id) => ({
        url: id.toString(),
        method: "DELETE",
      }),
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
  }),
});

export const {
  useGetRecordsQuery,
  useCreateRecordMutation,
  useDeleteRecordMutation,
} = recordsApi;
