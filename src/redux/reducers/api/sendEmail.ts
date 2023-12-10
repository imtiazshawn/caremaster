import { Email } from "$types/email";
import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./apiUtils";

export const sendEmail = createApi({
  reducerPath: "sendEmail",
  baseQuery: getBaseQuery("send-email"),
  endpoints: (builder) => ({
    sendEmail: builder.mutation<any, Email>({
      query: (email) => {
        const bodyFormData = new FormData();
        Object.entries(email).forEach(([key, value]) => {
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

export const { useSendEmailMutation } = sendEmail;
