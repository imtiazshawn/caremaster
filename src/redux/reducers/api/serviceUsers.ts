import { createApi } from "@reduxjs/toolkit/query/react";

import {
  ServiceUser,
  ServiceUserDto,
  ServiceUserResponse,
  ServiceUsersResponse,
} from "$types/serviceUsers";

import { getBaseQuery } from "./apiUtils";

export const serviceUsersApi = createApi({
  reducerPath: "serviceUsersApi",
  baseQuery: getBaseQuery("service-users"),
  endpoints: (builder) => ({
    getServiceUsers: builder.query<ServiceUser[], void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (res: ServiceUsersResponse) => {
        return res.response.data;
      },
    }),
    getServiceUser: builder.query<ServiceUser, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (res: ServiceUserResponse) => {
        return res.response;
      },
    }),
    createServiceUser: builder.mutation<ServiceUserResponse, ServiceUserDto>({
      query: (serviceUser) => {
        const bodyFormData = new FormData();
        Object.entries(serviceUser).forEach(([key, value]) => {
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
    updateServiceUser: builder.mutation<
      ServiceUserResponse,
      Partial<ServiceUser>
    >({
      query(serviceUser) {
        const bodyFormData = new FormData();
        Object.entries(serviceUser).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: `/${serviceUser.id}`,
          method: "PATCH",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
    deleteServiceUser: builder.mutation<any, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetServiceUsersQuery,
  useGetServiceUserQuery,
  useCreateServiceUserMutation,
  useUpdateServiceUserMutation,
  useDeleteServiceUserMutation,
} = serviceUsersApi;
