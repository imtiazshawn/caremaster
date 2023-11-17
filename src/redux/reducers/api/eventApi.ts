import { createApi } from "@reduxjs/toolkit/query/react";

import { Event, EventDTO, RotaEventGet } from "$types/event";
import { ApiResponseArray } from "$types/index";
import { getBaseQuery } from "./apiUtils";

type EventsResponse = ApiResponseArray<Event>;
type RotaEventGetResponse = ApiResponseArray<RotaEventGet>;

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: getBaseQuery("events"),
  endpoints: (builder) => ({
    getEvents: builder.query<RotaEventGet[], number>({
      query: (serviceUser) => ({
        url: `?service_user=${serviceUser}`,
        method: "GET",
      }),
      transformResponse: (response: RotaEventGetResponse) => {
        return response.response.data;
      },
    }),
    createEvent: builder.mutation<EventsResponse, EventDTO>({
      query: (event) => {
        const bodyFormData = new FormData();
        Object.entries(event).forEach(([key, value]) => {
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
    updateEvent: builder.mutation<
      EventsResponse,
      EventDTO & { record: number; id: number }
    >({
      query: (event) => {
        const bodyFormData = new FormData();
        Object.entries(event).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: event.id.toString(),
          method: "PUT",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
});

export const { useGetEventsQuery, useCreateEventMutation } = eventsApi;
