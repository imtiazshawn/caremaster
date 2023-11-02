import { ApiResponseArray } from ".";

enum EMPLOYMENT_STATUS {
  CURRENT = "Current",
  ARCHIVED = "Archived",
}

// TODO: This is an approximate type.
export type CareWorker = {
  name: string;
  email?: string;
  phone?: string;
  password?: string;
  user?: string;
  preferred_name?: string;
  photo?: string;
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
  home_to_first_shift?: string;
  last_shift_to_home?: string;
  max_weekly_hours?: string;
  travel_pay?: string;
  travel_pay_rate?: string;
  holiday_hours_alloted?: string;
};

export type CareWorkersResponse = ApiResponseArray<{
  date_of_birth: Date;
  created_at: Date;
  employment_status: EMPLOYMENT_STATUS;
  user: {
    id: number;
    name: string;
    phone: string;
    email: string;
  };
}>;
