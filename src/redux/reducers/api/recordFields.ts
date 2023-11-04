import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponseArray } from "$types/index";
import { RecordField, RecordFieldDTO } from "$types/recordFields";
import { getBaseQuery } from "./apiUtils";

type RecordFieldsResponse = ApiResponseArray<RecordField>;

export const recordFieldsApi = createApi({
  reducerPath: "recordFieldsApi",
  baseQuery: getBaseQuery("record-fields"),
  endpoints: (builder) => ({
    getRecordFields: builder.query<RecordField[], number>({
      query: (recordNo) => ({
        url: `?record=${recordNo}`,
        method: "GET",
      }),
      transformResponse: (response: RecordFieldsResponse) => {
        return response.response.data;
      },
    }),
    createRecordField: builder.mutation<
      RecordFieldsResponse,
      RecordFieldDTO & { record: number }
    >({
      query: (recordField) => {
        const bodyFormData = new FormData();
        Object.entries(recordField).forEach(([key, value]) => {
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
    updateRecordField: builder.mutation<
      RecordFieldsResponse,
      RecordFieldDTO & { record: number; id: number }
    >({
      query: (recordField) => {
        const bodyFormData = new FormData();
        Object.entries(recordField).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: recordField.id.toString(),
          method: "PUT",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
});

export const { useGetRecordFieldsQuery, useCreateRecordFieldMutation } =
  recordFieldsApi;
