import { ApiResponse, ApiResponseArray } from "$types/index";

export type CarePlanTaskTableUnit = {
  id: number;
  title: string;
  instruction: string;
  category: string;
  updated_at: Date;
};

export enum Frequency {
  DAILY = "Daily",
  ROTA_DAYS = "Rota Days",
  WEEKLY = "Weekly",
  FORTNIGHTLY = "Fortnightly",
  EVERY_THREE_WEEKS = "Every 3 weeks",
  QUARTERLY = "Quarterly",
  YEARLY = "Yearly",
}

export type CarePlanTask = {
  id: number;
  service_user_name: string;
  category_name: string;
  title: string;
  frequency: Frequency;
  time: string;
  instruction: string;
  created_at: Date;
  updated_at: Date;
  service_user: number;
  category: number;
};

export type CreateCarePlanTask = {
  category_name: string;
  title: string;
  frequency?: Frequency;
  time?: string;
  instruction?: string;
  service_user: number;
  category: number;
};

export type UpdateCarePlanTask = {
  id: number;
} & Partial<CreateCarePlanTask>;

export type CarePlanTasksResponse = ApiResponseArray<CarePlanTask>;
export type CarePlanTaskResponse = ApiResponse<CarePlanTask>;

export type CreateCarePlanTaskResponse = ApiResponse<string>;
