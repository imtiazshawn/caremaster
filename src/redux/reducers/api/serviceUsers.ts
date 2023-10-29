import { createApi } from "@reduxjs/toolkit/query/react";

import { ServiceUsersResponse } from "$types/serviceUsers";

import { ServiceUserType } from "$types/serviceUser";
import { getBaseQuery } from "./apiUtils";

export const serviceUsersApi = createApi({
  reducerPath: "serviceUsersApi",
  baseQuery: getBaseQuery("service-users"),
  endpoints: (builder) => ({
    getServiceUsers: builder.query<ServiceUsersResponse, null>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    createServiceUser: builder.mutation<ServiceUsersResponse, ServiceUserType>({
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
  }),
});

export const { useGetServiceUsersQuery, useCreateServiceUserMutation } =
  serviceUsersApi;
