import { ApiResponse, ApiResponseArray } from "$types/index";
export type ReferenceComment = {
  reason_for_leaving: string;
  summary_of_duties: string;
  doYouRefer: boolean;
};

export type Reference = {
  id: number;
  unique_id: string;
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

export type CreateReference = Omit<Reference, "id" | "unique_id">;

export type UpdateReference = CreateReference & { unique_id: string };

export type ReferencesResponse = ApiResponseArray<Reference>;
export type ReferenceResponse = ApiResponse<Reference>;

export type CreateReferenceResponse = ApiResponse<string>;
