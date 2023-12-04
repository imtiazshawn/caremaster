import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponse, ApiResponseArray } from "$types/index";
import { Template, TemplateDTO, TemplateFull } from "$types/template";
import { getBaseQuery } from "./apiUtils";

type TemplatesResponse = ApiResponseArray<Template>;
type TemplateFullResponse = ApiResponse<TemplateFull>;

export const templatesApi = createApi({
  reducerPath: "templatesApi",
  baseQuery: getBaseQuery("templates"),
  endpoints: (builder) => ({
    getTemplates: builder.query<Template[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (response: TemplatesResponse) => {
        return response.response.data;
      },
    }),
    getTemplate: builder.query<TemplateFull, number>({
      query: (id) => ({
        url: id.toString(),
        method: "GET",
      }),
      transformResponse: (response: TemplateFullResponse) => {
        return response.response;
      },
    }),
    createTemplate: builder.mutation<number, TemplateDTO>({
      query: (template) => {
        const bodyFormData = new FormData();
        Object.entries(template).forEach(([key, value]) => {
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
    updateTemplate: builder.mutation<number, TemplateDTO & { id: number }>({
      query: (template) => {
        const bodyFormData = new FormData();
        Object.entries(template).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: template.id.toString(),
          method: "PUT",
          body: bodyFormData,
          formData: true,
        };
      },
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
    deleteTemplate: builder.mutation<number, number>({
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
  useGetTemplatesQuery,
  useUpdateTemplateMutation,
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplateQuery,
} = templatesApi;
