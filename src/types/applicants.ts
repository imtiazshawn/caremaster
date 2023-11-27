import { GENDER, MARITAL_STATUS, SEXUALITY } from "$types/common";
import { ApiResponse, ApiResponseArray } from "$types/index";

export enum Disability {
  Physical = "Physical",
  None = "None",
  PreferNotToSay = "Prefer not to say",
}

export enum AgeBand {
  "16-24" = "16-24",
  "25-34" = "25-34",
  "35-44" = "35-44",
  "45-54" = "45-54",
  "+55" = "+55",
}

export enum bi {
  "yes" = 1,
  "no" = 0,
}

export type Applicant = {
  id: string;
  unique_id: string;
  post?: string;
  title?: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;
  surname?: string;
  email: string;
  phone?: string;
  telephone?: string;
  postcode?: string;
  address?: string;
  date_of_birth?: Date;
  nationality?: string;
  ni_number?: string;
  passport_number?: string;
  passport_expiry_date?: Date;
  gender?: GENDER;
  marital_status?: MARITAL_STATUS;
  age_band?: AgeBand;
  sexuality?: SEXUALITY;
  disabilities?: Disability;
  ethnicity?: string;
  religion?: string;
  experience?: string;
  next_of_kin_surname?: string;
  next_of_kin_forename?: string;
  next_of_kin_title?: string;
  next_of_kin_relationship?: string;
  next_of_kin_phone?: string;
  next_of_kin_postcode?: string;
  next_of_kin_address?: string;
  has_driving_license?: boolean;
  has_convictions_endorsements?: boolean;
  is_disabled_person?: boolean;
  has_employed_family_member?: boolean;
  pin?: string;
  application_status?: Record<string, any> | null;
  employment_history?: Record<string, any> | null;
  qualification?: Record<string, any> | null;
  documents?: Record<string, any> | null;
  reference?: Partial<ReferenceForm> | null;
  expiry_date?: Date;
  is_completed?: boolean;
  interview_answers?: Record<string, any>;
};

export type ApplicantResponse = ApiResponse<Applicant>;
export type ApplicantsResponse = ApiResponseArray<Applicant>;

export type CreateApplicant = Omit<Applicant, "id" | "unique_id">;
export type CreateApplicantResponse = ApiResponse<string>;

export type UpdateApplicant = Omit<Applicant, "id">;
export type UpdateApplicantResponse = ApiResponse<string>;

export type DBSForm = {
  ni_number: string;
  passport_number: string;
  passport_expiry_date: string;
  has_driving_license: boolean;
  has_convictions_endorsements: boolean;
  is_disabled_person: boolean;
};

export type PersonalDetailsForm = {
  unique_id: string;
  title: string;
  first_name: string;
  surname: string;
  middle_name?: string;
  address: string;
  telephone: string;
  phone: string;
  postcode: string;
  email: string;
  date_of_birth: Date;
  nationality: string;
  ni_number: string;
  passport_number: string;
  passport_expiry_date: Date;
  has_driving_license: boolean;
  has_convictions_endorsements: boolean;
  is_disabled_person: boolean;
  has_employed_family_member: boolean;
  pin?: string;
  expiry_date?: Date;
};

export const PersonalDetailsFormItemsOptional: (keyof PersonalDetailsForm)[] = [
  "pin",
  "expiry_date",
  "middle_name",
];
export const PersonalDetailsFormItemsCompulsory: (keyof PersonalDetailsForm)[] =
  [
    "unique_id",
    "title",
    "first_name",
    "surname",
    "address",
    "telephone",
    "phone",
    "postcode",
    "email",
    "date_of_birth",
    "nationality",
    "ni_number",
    "passport_number",
    "passport_expiry_date",
    "has_driving_license",
    "has_convictions_endorsements",
    "is_disabled_person",
    "has_employed_family_member",
  ];

export const PersonalDetailsFormItems: (keyof PersonalDetailsForm)[] = [
  ...PersonalDetailsFormItemsCompulsory,
  ...PersonalDetailsFormItemsOptional,
];

export type EmploymentHistoryForm = {
  unique_id: string;
  startDate: Date;
  endDate: Date;
  employersName: string;
  employersAddress: string;
  job: string;
  reasonforLeaving: string;
};
export const EmploymenHistoryFormItems: (keyof EmploymentHistoryForm)[] = [
  "unique_id",
  "startDate",
  "endDate",
  "employersName",
  "employersAddress",
  "job",
  "reasonforLeaving",
];

export type EducationHistoryForm = {
  unique_id: string;
  startDate: Date;
  endDate: Date;
  qualificaiton: string;
  awarding_body: string;
};
export const EducationHistoryFormItmes: (keyof EducationHistoryForm)[] = [
  "unique_id",
  "startDate",
  "endDate",
  "qualificaiton",
  "awarding_body",
];

export type ReferenceForm = Record<(typeof ReferenceFormItmes)[number], string>;

export const ReferenceFormFileItems = [
  "first_referrer_passport_size_photo",
  "first_attachment",
  "second_referrer_passport_size_photo",
  "second_attachment",
] as const;
export const KinItems = [
  "next_of_kin_surname",
  "next_of_kin_forename",
  "next_of_kin_title",
  "next_of_kin_relationship",
  "next_of_kin_phone",
  "next_of_kin_postcode",
  "next_of_kin_address",
] as const;

export type DocumentsForm = Record<(typeof DocumentItems)[number], string>;
export const DocumentItems = [
  "passport",
  "biometric",
  "proof_of_address_first",
  "proof_of_address_second",
  "dbs",
  "passport_size_photo",
  "training",
  "cv",
  "driving_license",
  "others",
] as const;

export const ReferenceFormItmes = [
  "first_referrer_email",
  "first_referrer_name",
  "first_referrer_phone",
  "first_referrer_company",
  "first_referrer_job_title",
  "first_referrer_address",
  "second_referrer_email",
  "second_referrer_name",
  "second_referrer_phone",
  "second_referrer_company",
  "second_referrer_job_title",
  "second_referrer_address",
  ...KinItems,
] as const;

export type Status = "incomplete" | "complete";
export type Section =
  | "personalDetails"
  | "questionnaire"
  | "employmentHistory"
  | "references"
  | "educationHistory"
  | "documents"
  | "overall";
export type ApplicationStatus = Record<Section, Status> & {
  completedCount: number;
  total: number;
};
