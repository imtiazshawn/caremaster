import { ApiResponseArray } from ".";

// TODO: This is an approximate type.
export type CareWorker = {
  id: number | string;
  title: string;
  name: string;
  role: string;
  date_of_birth: string;
  gender: string;
  pronoun: string;
  address: string;
  postcode: string;
  mobile: string;
  email: string;
  photo: null | string;
  is_active: true;
  status: boolean | string;
  created_at: string;
  updated_at: string;
};

export type CareWorkersResponse = ApiResponseArray<CareWorker>;
