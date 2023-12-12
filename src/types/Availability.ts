export type Availability = {
  weekday: string;
  start_time: string;
  end_time: string;
};

export const availabilityTimeFormat = "HH:mm:ss";

export type AvailabilityGet = Availability & {
  id: number;
  careworker: number; // -> care_worker
};
