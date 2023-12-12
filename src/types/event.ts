import { CareWorker } from "$types/careWorkers";
import { Event as CalendarEvent } from "react-big-calendar";
export type Event = {
  id: number;
  title?: string;
  start_date: string;
  end_date: string;
  repeat_week: string;
  end_type: string;
  end_after_occurrence: string;
  repeat_on: string;
  start_time: string;
  end_time: string;
  service_user: number;
  care_workers: number[];
  care_plan_tasks: number[];
  update_type?: string;
};

export type RotaEventGet = {
  care_plan_tasks: number[];
  care_workers: number[];
  created_at: string;
  date: string | Date;
  end_time: string | Date;
  id: number;
  note: string;
  service_user: number;
  start_time: string | Date;
  title: string;
  updated_at: string;
  weekday: string;
};

export type RotaEventUpdate = {
  care_plan_tasks?: number[];
  care_workers?: number[];
  created_at?: string;
  date?: string | Date;
  end_time?: string | Date;
  id: number;
  note?: string;
  service_user?: number;
  start_time?: string | Date;
  title?: string;
  updated_at?: string;
  weekday?: string;
  update_type: string;
};

export type CalenderCellType = {
  events: ModifiedEvent[];
  careWorker: CareWorker | null;
};

export type GridType = CalenderCellType[][];

export type EventDTO = Omit<Event, "id">;
export type ModifiedEvent = RotaEventGet & CalendarEvent;
