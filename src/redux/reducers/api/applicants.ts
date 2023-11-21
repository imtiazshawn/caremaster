import { createApi } from "@reduxjs/toolkit/query/react";

import {
  Applicant,
  ApplicantResponse,
  ApplicantsResponse,
  CreateApplicant,
  CreateApplicantResponse,
} from "$types/applicants";
import { getBaseQuery } from "./apiUtils";

export const applicantsApi = createApi({
  reducerPath: "applicantsApi",
  baseQuery: getBaseQuery("applicants"),
  endpoints: (builder) => ({
    getApplicants: builder.query<Applicant[], null>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (res: ApplicantsResponse) => {
        return res.response.data;
      },
    }),
    getApplicant: builder.query<Applicant, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (res: ApplicantResponse) => {
        return res.response;
      },
    }),
    createApplicant: builder.mutation<CreateApplicantResponse, CreateApplicant>(
      {
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
      },
    ),
    updateApplicant: builder.mutation<
      CreateApplicantResponse,
      CreateApplicant & { unique_id: string }
    >({
      query(applicant) {
        const bodyFormData = new FormData();
        Object.entries(applicant).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: `/${applicant.unique_id}`,
          method: "PATCH",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useGetApplicantsQuery,
  useGetApplicantQuery,
  useCreateApplicantMutation,
  useUpdateApplicantMutation,
} = applicantsApi;
