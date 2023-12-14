import { ApiResponse } from "$types/index";
import { StaffProfile } from "$types/staffProfile";
import { getBaseQuery } from "@reducers/api/apiUtils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const staffProfileApi = createApi({
  reducerPath: "staffProfileApi",
  baseQuery: getBaseQuery("staff-profile"),
  endpoints: (builder) => ({
    getStaffProfile: builder.query<StaffProfile, void>({
      query: () => ({
        url: "",
        method: "get",
      }),
      transformResponse: (response: ApiResponse<StaffProfile>) => {
        return response.response;
      },
    }),
  }),
});

export const { useGetStaffProfileQuery } = staffProfileApi;
