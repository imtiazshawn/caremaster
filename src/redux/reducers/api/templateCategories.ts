import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponseArray } from "$types/index";
import { TemplateCategory, TemplateCategoryDTO } from "$types/templateCategory";
import { getBaseQuery } from "./apiUtils";

type TemplateCategoriesResponse = ApiResponseArray<TemplateCategory>;

export const templateCategoriesApi = createApi({
  reducerPath: "templateCategoriesApi",
  baseQuery: getBaseQuery("template-categories"),
  endpoints: (builder) => ({
    getTemplateCategories: builder.query<TemplateCategory[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (response: TemplateCategoriesResponse) => {
        return response.response.data;
      },
    }),
    createTemplateCategory: builder.mutation<number, TemplateCategoryDTO>({
      query: (templateCategory) => {
        const bodyFormData = new FormData();
        Object.entries(templateCategory).forEach(([key, value]) => {
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
    updateTemplateCategory: builder.mutation<
      number,
      TemplateCategoryDTO & { id: number }
    >({
      query: (templateCategory) => {
        const bodyFormData = new FormData();
        Object.entries(templateCategory).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: templateCategory.id.toString(),
          method: "PUT",
          body: bodyFormData,
          formData: true,
        };
      },
      transformResponse: (response: any) => {
        return response.response;
      },
    }),
    deleteTemplateCategory: builder.mutation<number, number>({
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
  useGetTemplateCategoriesQuery,
  useCreateTemplateCategoryMutation,
  useDeleteTemplateCategoryMutation,
} = templateCategoriesApi;
