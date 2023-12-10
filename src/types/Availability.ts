import { ApiResponseArray } from "$types/index";

export type Availability = {
  weekday: string;
  start_time: string;
  end_time: string;
};

export type AvailabilityResponses = ApiResponseArray<Availability>;
