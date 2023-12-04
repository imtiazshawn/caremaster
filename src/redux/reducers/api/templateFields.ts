import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponseArray } from "$types/index";
import { TemplateField, TemplateFieldDTO } from "$types/templateField";
import { getBaseQuery } from "./apiUtils";

type TemplateFieldsResponse = ApiResponseArray<TemplateField>;

export const templateFieldsApi = createApi({
  reducerPath: "templateFieldsApi",
  baseQuery: getBaseQuery("template-fields"),
  endpoints: (builder) => ({
    getTemplateFields: builder.query<TemplateField[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (response: TemplateFieldsResponse) => {
        return response.response.data;
      },
    }),
    createTemplateField: builder.mutation<number, TemplateFieldDTO>({
      query: (templateField) => {
        const bodyFormData = new FormData();
        Object.entries(templateField).forEach(([key, value]) => {
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
    updateTemplateField: builder.mutation<
      number,
      TemplateFieldDTO & { id: number }
    >({
      query: (templateField) => {
        const bodyFormData = new FormData();
        Object.entries(templateField).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: templateField.id.toString(),
          method: "PUT",
          body: bodyFormData,
          formData: true,
        };
      },
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
    deleteTemplateField: builder.mutation<number, number>({
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
  useGetTemplateFieldsQuery,
  useUpdateTemplateFieldMutation,
  useCreateTemplateFieldMutation,
  useDeleteTemplateFieldMutation,
} = templateFieldsApi;
