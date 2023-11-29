import { createApi } from "@reduxjs/toolkit/query/react";

import { Event, EventDTO, RotaEventGet, RotaEventUpdate } from "$types/event";
import { ApiResponseArray } from "$types/index";
import { getBaseQuery } from "./apiUtils";

type EventsResponse = ApiResponseArray<Event>;
type RotaEventGetResponse = ApiResponseArray<RotaEventGet>;

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: getBaseQuery("events"),
  endpoints: (builder) => ({
    getAllEvents: builder.query<RotaEventGet[], void>({
      query: () => "",
      transformResponse: (response: RotaEventGetResponse) => {
        return response.response.data;
      },
    }),
    getEvents: builder.query<RotaEventGet[], number | null>({
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
    updateEvent: builder.mutation<EventsResponse, RotaEventUpdate>({
      query: (event) => {
        const bodyFormData = new FormData();
        Object.entries(event).forEach(([key, value]) => {
          bodyFormData.append(key, value as string);
        });

        return {
          url: event.id.toString(),
          method: "PATCH",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useGetAllEventsQuery,
} = eventsApi;
