import { createApi } from "@reduxjs/toolkit/query/react";

import {
  CarePlanCategoriesResponse,
  CarePlanCategory,
  CarePlanCategoryResponse,
  CreateCarePlanCategory,
  CreateCarePlanCategoryResponse,
} from "$types/carePlanCategories";
import { getBaseQuery } from "./apiUtils";

export const carePlanCategoriesApi = createApi({
  reducerPath: "carePlanCategoriesApi",
  baseQuery: getBaseQuery("care-plan-categories"),
  endpoints: (builder) => ({
    getCarePlanCategories: builder.query<CarePlanCategory[], null>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (res: CarePlanCategoriesResponse) => {
        return res.response.data;
      },
    }),
    getCarePlanCategory: builder.query<CarePlanCategory, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (res: CarePlanCategoryResponse) => {
        return res.response;
      },
    }),
    createCarePlanCategory: builder.mutation<
      CreateCarePlanCategoryResponse,
      CreateCarePlanCategory
    >({
      query: (carePlanCategory) => {
        const bodyFormData = new FormData();
        Object.entries(carePlanCategory).forEach(([key, value]) => {
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

export const {
  useGetCarePlanCategoryQuery,
  useGetCarePlanCategoriesQuery,
  useCreateCarePlanCategoryMutation,
} = carePlanCategoriesApi;
