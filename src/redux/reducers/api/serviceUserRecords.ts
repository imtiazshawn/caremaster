import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponseArray } from "$types/index";
import {
  CreateServiceUserRecord,
  ServiceUserRecords,
  UpdateServiceUserRecord,
} from "$types/serviceUserRecords";
import { getBaseQuery } from "./apiUtils";

type RecordsResponse = ApiResponseArray<ServiceUserRecords>;

export const serviceUserRecordsApi = createApi({
  reducerPath: "serviceUserRecordsApi",
  baseQuery: getBaseQuery("service-user-records", "*/*"),
  endpoints: (builder) => ({
    getServiceUserRecords: builder.query<ServiceUserRecords[], number>({
      query(id) {
        return {
          url: "",
          method: "GET",
          params: {
            service_user: id,
          },
        };
      },
      transformResponse: (response: RecordsResponse) => {
        return response.response.data;
      },
    }),
    createServiceUserRecord: builder.mutation<
      CreateServiceUserRecord,
      CreateServiceUserRecord
    >({
      query: (serviceUserRecord) => {
        const formData = new FormData();
        formData.append("service_user", String(serviceUserRecord.service_user));
        formData.append("record", String(serviceUserRecord.record));
        formData.append("values", JSON.stringify(serviceUserRecord.values));

        return {
          url: "",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
    updateServiceUserRecord: builder.mutation<
      UpdateServiceUserRecord,
      UpdateServiceUserRecord
    >({
      query: (serviceUserRecord) => {
        const formData = new FormData();
        formData.append("values", JSON.stringify(serviceUserRecord.values));

        return {
          url: `/${serviceUserRecord.service_user_record}`,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
    }),
    deleteServiceUserRecord: builder.mutation<number, string>({
      query(id) {
        return {
          url: id,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetServiceUserRecordsQuery,
  useCreateServiceUserRecordMutation,
  useUpdateServiceUserRecordMutation,
  useDeleteServiceUserRecordMutation,
} = serviceUserRecordsApi;
