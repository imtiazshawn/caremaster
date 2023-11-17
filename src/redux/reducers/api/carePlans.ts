import { createApi } from "@reduxjs/toolkit/query/react";

import {
  CarePlan,
  CarePlanResponse,
  CarePlansResponse,
  CreateCarePlan,
  CreateCarePlanResponse,
  UpdateCarePlan,
} from "$types/carePlans";
import { getBaseQuery } from "./apiUtils";

export const carePlansApi = createApi({
  reducerPath: "carePlansApi",
  baseQuery: getBaseQuery("care-plans"),
  endpoints: (builder) => ({
    getCarePlans: builder.query<CarePlan[], number>({
      query: (id) => ({
        url: `?service_user=${id}`,
        method: "GET",
      }),
      transformResponse: (res: CarePlansResponse) => {
        return res.response.data;
      },
    }),
    getCarePlan: builder.query<CarePlan, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (res: CarePlanResponse) => {
        return res.response;
      },
    }),
    createCarePlan: builder.mutation<CreateCarePlanResponse, CreateCarePlan>({
      query: (carePlan) => {
        const bodyFormData = new FormData();
        Object.entries(carePlan).forEach(([key, value]) => {
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
    updateCarePlan: builder.mutation<CreateCarePlanResponse, UpdateCarePlan>({
      query(carePlan) {
        const bodyFormData = new FormData();
        Object.entries(carePlan).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: `/${carePlan.id}`,
          method: "PATCH",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
    deleteCarePlan: builder.mutation<{ id: number }, unknown>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCarePlansQuery,
  useGetCarePlanQuery,
  useCreateCarePlanMutation,
  useUpdateCarePlanMutation,
  useDeleteCarePlanMutation,
} = carePlansApi;
