import { ApiResponse, ApiResponseArray } from ".";

export enum HOME_TO_FIRST_SHIFT {
  MILEAGE_NOT_PAID = "Mileage not paid",
  MILEAGE_PAID = "Mileage paid",
}

export enum LAST_SHIFT_TO_HOME {
  MILEAGE_NOT_PAID = "Mileage not paid",
  MILEAGE_PAID = "Mileage paid",
}

export enum EMPLOYMENT_STATUS {
  CURRENT = "Current",
  ARCHIVED = "Archived",
}

export type UpdateCareWorkerReq = Omit<
  CreateCareWorker,
  "user" | "password"
> & {
  first_name: string;
  last_name: string;
  leave_date: Date;
  // first_name: string;
};

export type Screening = CareWorker;

export type CareWorkersTableUnit = {
  id: number | string;
  name: string;
  role: string;
  created_at: Date;
  phone: string;
  email: string;
  status: boolean | string;
};

export type CreateCareWorker = {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  user?: Record<string, string>;
  preferred_name?: string;
  photo?: File | string;
  pin?: string;
  employee_number?: string;
  employment_status?: EMPLOYMENT_STATUS;
  start_date?: string;
  end_date?: string;
  address?: string;
  postcode?: string;
  region?: string;
  ni_number?: string;
  date_of_birth?: string;
  gender?: string;
  sexuality?: string;
  nationality?: string;
  ethnicity?: string;
  marital_status?: string;
  emergency_name?: string;
  emergency_number?: string;
  emergency_note?: string;
  contracted_hours?: string;
  pence_per_mile?: string;
  mileage_paid_only_after?: string;
  home_to_first_shift?: HOME_TO_FIRST_SHIFT;
  last_shift_to_home?: LAST_SHIFT_TO_HOME;
  max_weekly_hours?: string;
  travel_pay?: string;
  travel_pay_rate?: string;
  holiday_hours_alloted?: string;
};

export type CareWorker = Omit<
  CreateCareWorker,
  "name" | "email" | "phone" | "password" | "user" | "photo"
> & {
  user: UserForFetchCareWorker;
  photo: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

type UserForFetchCareWorker = {
  name: string;
  phone: string;
  email: string;
};

export type CareWorkersResponse = ApiResponseArray<CareWorker>;
export type CareWorkerResponse = ApiResponse<CareWorker>;

export type CreateCareWorkersResponse = ApiResponse<string>;

export enum PERSON_PROFILE_SEGMENT {
  DETAILS = "Details",
  ROLE_AND_ACCESS_RIGHT = "Role & Access Right",
  BACKGROUND = "Background",
  EMERGENCY_CONTACT = "Emergency Contact",
  VACCINES = "Vaccines",
}

export type PersonProfileSegments = `${PERSON_PROFILE_SEGMENT}`;
