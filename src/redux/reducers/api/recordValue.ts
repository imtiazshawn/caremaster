import { createApi } from "@reduxjs/toolkit/query/react";

import { UpdateRecordValue } from "$types/serviceUserRecords";
import { getBaseQuery } from "./apiUtils";


export const recordValuesApi = createApi({
  reducerPath: "recordValuesApi",
  baseQuery: getBaseQuery("record-values"),
  endpoints: (builder) => ({
    updateRecordValue: builder.mutation<any, UpdateRecordValue>({
      query: (body) => {
        const formData = new FormData();
        formData.append("value", body.value);
        formData.append("value_type", body.value_type);
        formData.append("record", body.record.toString());
        formData.append("record_field", body.record_field.toString());

        return {
          url: String(body.id),
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
    }),
  }),
});

export const { useUpdateRecordValueMutation } = recordValuesApi;
