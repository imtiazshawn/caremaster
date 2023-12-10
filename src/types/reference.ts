import { ApiResponse, ApiResponseArray } from "$types/index";
export type ReferenceComment = {
  reason_for_leaving: string;
  summary_of_duties: string;
  doYouRefer: boolean;
};

export type Reference = {
  id: number;
  name?: string;
  job_title?: string;
  company?: string;
  address?: string;
  telephone?: string;
  email?: string;
  comment?: ReferenceComment;
  is_email_sent?: boolean;
  is_confirmed?: boolean;
  applicant: number;
};

export type CreateReference = Omit<Reference, "id">;

export type UpdateReference = CreateReference & { id: number };

export type ReferencesResponse = ApiResponseArray<Reference>;
export type ReferenceResponse = ApiResponse<Reference>;

export type CreateReferenceResponse = ApiResponse<string>;
