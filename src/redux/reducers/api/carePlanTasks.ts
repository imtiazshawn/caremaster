import { createApi } from "@reduxjs/toolkit/query/react";

import {
  CarePlanTask,
  CarePlanTaskResponse,
  CarePlanTasksResponse,
  CreateCarePlanTask,
  CreateCarePlanTaskResponse,
  UpdateCarePlanTask,
} from "$types/carePlanTasks";
import { getBaseQuery } from "./apiUtils";

export const carePlanTasksApi = createApi({
  reducerPath: "carePlanTasksApi",
  baseQuery: getBaseQuery("care-plan-tasks"),
  endpoints: (builder) => ({
    getCarePlanTasks: builder.query<CarePlanTask[], number>({
      query: (id) => ({
        url: `?service_user=${id}`,
        method: "GET",
      }),
      transformResponse: (res: CarePlanTasksResponse) => {
        return res.response.data;
      },
    }),
    getCarePlanTask: builder.query<CarePlanTask, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (res: CarePlanTaskResponse) => {
        return res.response;
      },
    }),
    createCarePlanTask: builder.mutation<
      CreateCarePlanTaskResponse,
      CreateCarePlanTask
    >({
      query: (carePlanTask) => {
        const bodyFormData = new FormData();
        Object.entries(carePlanTask).forEach(([key, value]) => {
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
    updateCarePlanTask: builder.mutation<
      CreateCarePlanTaskResponse,
      UpdateCarePlanTask
    >({
      query(carePlanTask) {
        const bodyFormData = new FormData();
        Object.entries(carePlanTask).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: `/${carePlanTask.id}`,
          method: "PATCH",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
    deleteCarePlanTask: builder.mutation<{ id: number }, unknown>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCarePlanTasksQuery,
  useGetCarePlanTaskQuery,
  useCreateCarePlanTaskMutation,
  useUpdateCarePlanTaskMutation,
  useDeleteCarePlanTaskMutation,
} = carePlanTasksApi;
