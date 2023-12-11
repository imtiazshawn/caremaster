import {
  CreateReference,
  CreateReferenceResponse,
  Reference,
  ReferenceResponse,
  ReferencesResponse,
  UpdateReference,
} from "$types/reference";
import { getBaseQuery } from "@reducers/api/apiUtils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const referenceApi = createApi({
  reducerPath: "referenceApi",
  baseQuery: getBaseQuery("applicant-reference"),
  endpoints: (builder) => ({
    getReferences: builder.query<Reference[], string>({
      query: (applicant_unique_id) => ({
        url: `?applicant=${applicant_unique_id}`,
        method: "GET",
      }),
      transformResponse: (res: ReferencesResponse) => {
        return res.response.data;
      },
    }),
    getReference: builder.query<Reference, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      transformResponse: (res: ReferenceResponse) => {
        return res.response;
      },
    }),
    createReference: builder.mutation<CreateReferenceResponse, CreateReference>(
      {
        query: (reference) => {
          const bodyFormData = new FormData();
          Object.entries(reference).forEach(([key, value]) => {
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
    updateReference: builder.mutation<CreateReferenceResponse, UpdateReference>(
      {
        query: (reference) => {
          const bodyFormData = new FormData();
          Object.entries(reference).forEach(([key, value]) => {
            bodyFormData.append(key, value as string);
          });
          return {
            url: `/${reference.unique_id}`,
            method: "PATCH",
            body: bodyFormData,
            formData: true,
          };
        },
      },
    ),
  }),
});

export const {
  useGetReferencesQuery,
  useGetReferenceQuery,
  useCreateReferenceMutation,
  useUpdateReferenceMutation,
} = referenceApi;
