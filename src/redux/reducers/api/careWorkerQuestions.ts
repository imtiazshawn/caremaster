import {
  CareWorkerQuestion,
  CareWorkerQuestionResponse,
  CareWorkerQuestionsResponse,
} from "$types/careWorkerQuestions";
import { getBaseQuery } from "@reducers/api/apiUtils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const careWorkerQuestionsApi = createApi({
  reducerPath: "careWorkerQuestionsApi",
  baseQuery: getBaseQuery("applicant-questions"),
  endpoints: (builder) => ({
    getCareWorkerQuestions: builder.query<CareWorkerQuestion[], null>({
      query: () => ({
        url: "",
        method: "GET",
      }),
      transformResponse: (res: CareWorkerQuestionsResponse) => {
        return res.response.data;
      },
    }),
    getCareWorkerQuestion: builder.query<CareWorkerQuestion, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (res: CareWorkerQuestionResponse) => {
        return res.response;
      },
    }),
  }),
});

export const { useGetCareWorkerQuestionsQuery, useGetCareWorkerQuestionQuery } =
  careWorkerQuestionsApi;
