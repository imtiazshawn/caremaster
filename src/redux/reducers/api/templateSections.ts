import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponseArray } from "$types/index";
import { TemplateSection, TemplateSectionDTO } from "$types/templateSection";
import { getBaseQuery } from "./apiUtils";

type TemplateSectionsResponse = ApiResponseArray<TemplateSection>;

export const templateSectionsApi = createApi({
  reducerPath: "templateSectionsApi",
  baseQuery: getBaseQuery("template-sections"),
  endpoints: (builder) => ({
    getTemplateSections: builder.query<TemplateSection[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (response: TemplateSectionsResponse) => {
        return response.response.data;
      },
    }),
    createTemplateSection: builder.mutation<number, TemplateSectionDTO>({
      query: (templateSection) => {
        const bodyFormData = new FormData();
        Object.entries(templateSection).forEach(([key, value]) => {
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
    updateTemplateSection: builder.mutation<
      number,
      TemplateSectionDTO & { id: number }
    >({
      query: (templateSection) => {
        const bodyFormData = new FormData();
        Object.entries(templateSection).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: templateSection.id.toString(),
          method: "PUT",
          body: bodyFormData,
          formData: true,
        };
      },
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
    deleteTemplateSection: builder.mutation<number, number>({
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
  useGetTemplateSectionsQuery,
  useUpdateTemplateSectionMutation,
  useCreateTemplateSectionMutation,
  useDeleteTemplateSectionMutation,
} = templateSectionsApi;
