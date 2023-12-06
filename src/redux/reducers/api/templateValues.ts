import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponseArray } from "$types/index";
import { TemplateValue, TemplateValueDTO } from "$types/templateValue";
import { getBaseQuery } from "./apiUtils";

type TemplateValuesResponse = ApiResponseArray<TemplateValue>;

export const templateValuesApi = createApi({
  reducerPath: "templateValuesApi",
  baseQuery: getBaseQuery("template-values"),
  endpoints: (builder) => ({
    getTemplateValues: builder.query<
      TemplateValue[],
      {
        templateId: number;
        serviceUserId: number;
      }
    >({
      query: ({ templateId, serviceUserId }) => ({
        url: `?service_user=${serviceUserId}&template=${templateId}`,
        method: "GET",
      }),
      transformResponse: (response: TemplateValuesResponse) => {
        return response.response.data;
      },
    }),
    createTemplateValue: builder.mutation<number, TemplateValueDTO>({
      query: (templateValue) => {
        return {
          url: "",
          method: "POST",
          body: [templateValue],
          formData: true,
        };
      },
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
    updateTemplateValue: builder.mutation<
      number,
      TemplateValueDTO & { id: number }
    >({
      query: (templateValue) => {
        return {
          url: templateValue.id.toString(),
          method: "PUT",
          body: templateValue,
          formData: true,
        };
      },
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
    deleteTemplateValue: builder.mutation<number, number>({
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
  useGetTemplateValuesQuery,
  useUpdateTemplateValueMutation,
  useCreateTemplateValueMutation,
  useDeleteTemplateValueMutation,
} = templateValuesApi;
