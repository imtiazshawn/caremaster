import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponse } from "$types/index";
import { getBaseQuery } from "./apiUtils";

type FileUploadResponse = ApiResponse<string>;

export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: getBaseQuery("file-upload"),
  endpoints: (builder) => ({
    createFileUpload: builder.mutation<string, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: "",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      transformResponse: (res: FileUploadResponse) => {
        return res.response;
      },
    }),
  }),
});

export const { useCreateFileUploadMutation } = fileUploadApi;
