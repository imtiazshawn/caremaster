import { createApi } from "@reduxjs/toolkit/query/react";

import { getBaseQuery } from "./apiUtils";

export const acceptApplicantApi = createApi({
  reducerPath: "acceptApplicant",
  baseQuery: getBaseQuery("accept-applicant"),
  endpoints: (builder) => ({
    acceptApplicant: builder.mutation<any, { unique_id: string }>({
      query: (applicant) => {
        const bodyFormData = new FormData();
        Object.entries(applicant).forEach(([key, value]) => {
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

export const { useAcceptApplicantMutation } = acceptApplicantApi;
