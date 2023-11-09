import { GENDER, MARITAL_STATUS, SEXUALITY } from "$types/common";
import { ApiResponse, ApiResponseArray } from ".";

export enum PRONOUN {
  HE = "He",
  SHE = "She",
  THEY = "They",
}

export enum REGION {
  BIRMINGHAM = "Birmingham",
  BOLTAN = "Boltan",
  LIVERPOOL = "Liverpool",
  LONDON = "London",
  MANCHESTER = "Manchester",
  OLDHAM = "Oldham",
  STOCKPORT = "Stockport",
  WITHINGTON = "Withington",
}

export enum DNAR {
  RESUSCITATE = "Resuscitate",
  DO_NOT_RESUSCITATE = "Do not resuscitate",
}

export enum ENROLLMENT_STATUS {
  LIVE = "Live",
  PRE_ADMISSION = "Pre-admission",
  ARCHIVED = "Archived",
  ARCHIVED_PRE_ADMISSION = "Archived pre-admission",
  ON_HOLD = "On hold",
  Hospitalized = "Hospitalized",
}

export enum FUNERAL_ARRANGEMENT {
  UNKNOWN = "Unknown",
  BURIAL = "Burial",
  CREMATION = "Cremation",
}

export enum SERVICE_TYPE {
  ADULT_SOCIAL_CARE = "Adult Social Care",
  HEALTH = "Health",
  NON_WEIGHT_BEARING = "Non Weight Bearing",
  SHORT_BREAKS = "Short breaks",
  DOM_CARE_ONLY = "Dom Care only",
  COMPANIONSHIP = "Companionship",
  LIVE_IN = "Live In",
  DIRECT_PAYMENT = "Direct Payment",
  OTHER = "Other",
}

export enum SERVICE_LEVEL {
  HC99_HOME_CARE_HOUR = "99HC Home Care Hour",
  FN99_HOME_CARE_FRAMEWORK_HOUR = "99FN Home Care Framework Hour",
  XC99_EXTRA_CARER_HOME_CARE_HOUR = "99XC Extra Carer Home Care Hour (Double Manned Hour)",
  DOMICILIARY_SUPPORT_GENERIC = "Domiciliary Support - Generic Domiciliary Services",
  DOMICILIARY_SUPPORT_COMPLEX = "Domiciliary Support - Complex",
  DOMICILIARY_SUPPORT_NON_WEIGHT_BEARING = "Domiciliary Support - Non-Weight Bearing Pathway",
  HC_CAREWORKER = "HC - Careworker",
  HEALTH_DOMICILIARY_SUPPORT_GENERIC = "Health Domiciliary Support - Generic Health Domiciliary Services",
  HEALTH_DOMICILIARY_SUPPORT_COMPLEX = "Health Domiciliary Support - Complex",
  MAINTENANCE = "Maintenance",
  MAINTENANCE_CARERS_2 = "Maintenance - 2 Carers",
  MAINTENANCE_CARERS_3 = "Maintenance - 3 Carers",
  MAINTENANCE_CARERS_4 = "Maintenance - 4 Carers",
  MAINTENANCE_CARERS_5 = "Maintenance - 5 Carers",
  OUTREACH_SUPPORT = "Outreach - Support",
  PERSONAL_VISIT_DAY_HOUR = "Personal Day Hour:Timetabled-visit (Hour)",
  PERSONAL_VISIT_WKND_HOUR = "Personal Wknd Hour:Timetabled-visit",
  SUPPORTED_LIVING = "Supported Living",
}

export enum COMMUNICATION_PREFERENCE {
  TELEPHONE = "Telephone",
  LETTER = "Letter",
  EMAIL = "Email",
  TEXT_MESSAGE = "Text message",
  FACE_TO_FACE = "Face to face",
  RELATIVE = "Relative",
  TRUSTED_PERSON = "Trusted person",
}

export enum EMERGENCY_RATING {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
}

export enum YES_NO_CHOICE {
  YES = "Yes",
  NO = "No",
}

export enum MAIN_DIET {
  MEAT_EATER = "Meat eater",
  NA = "N/A",
  VEGAN = "Vegan",
  VEGETARIAN = "Vegetarian",
}

export enum SPECIAL_DIET {
  NA = "N/A",
  PUREE_FOODS = "Puree foods",
  SOFT_FOODS = "Soft foods",
  FOOD_THICKENER = "Food thickener",
  NUTRITIONAL_SUPPLEMENT = "Nutritional supplement",
}

export type ServiceUser = {
  id: number;
  title?: string;
  name: string;
  preferred_name?: string;
  date_of_birth?: Date;
  gender?: `${GENDER}`;
  gender_at_birth?: `${GENDER}`;
  pronoun?: `${PRONOUN}`;
  address?: string;
  postcode?: string;
  latitude?: string;
  longitude?: string;
  region?: `${REGION}`;
  telephone?: string;
  mobile?: string;
  email?: string;
  dnar?: `${DNAR}`;
  sexuality?: `${SEXUALITY}`;
  enrollment_status?: `${ENROLLMENT_STATUS}`;
  photo?: File | string;
  admission_date?: Date;
  banding?: string;
  authority?: string;
  funeral_arrangement?: `${FUNERAL_ARRANGEMENT}`;
  funeral_director?: string;
  nhs_number?: string;
  ni_number?: string;
  personal_id?: string;
  qr_code?: string;
  council_service_user_id?: string;
  council_care_provider_id?: string;
  service_type?: `${SERVICE_TYPE}`;
  service_level?: `${SERVICE_LEVEL}`;
  marital_status?: `${MARITAL_STATUS}`;
  religion?: string;
  ethnicity?: string;
  communication_preference?: `${COMMUNICATION_PREFERENCE}`;
  emergency_rating?: `${EMERGENCY_RATING}`;
  key_safe_code?: string;
  access_details?: string;
  height?: string;
  weight?: string;
  bmi?: string;
  medical_history?: string;
  medicine_allergies?: string;
  oxygen?: `${YES_NO_CHOICE}`;
  on_catheter?: `${YES_NO_CHOICE}`;
  food_allergies?: string;
  nil_by_mouth?: `${YES_NO_CHOICE}`;
  main_diet?: `${MAIN_DIET}`;
  special_diet?: `${SPECIAL_DIET}`;
  diet_instruction?: string;
  is_active?: boolean;
  health_tag?: number[];
  created_at?: Date;
  updated_at?: Date;
};

export type ServiceUserDto = Omit<ServiceUser, "id">;

export type ServiceUsersResponse = ApiResponseArray<ServiceUser>;
export type ServiceUserResponse = ApiResponse<ServiceUser>;

export enum PERSON_PROFILE_SEGMENTS {
  SERVICE_USER = "Basic Info",
  IDENTIFICATION = "Identification",
  BACKGROUND = "Background",
  COUNCIL = "Council",
  OTHERS = "Others",
}

export type PersonProfileSegments = `${PERSON_PROFILE_SEGMENTS}`;

export type ServiceUsersTableUnit = {
  id: number;
  name: string;
  postcode?: string;
  address?: string;
  food_allergies?: string;
  medicine_allergies?: string;
  created_at?: Date;
  date_of_birth?: Date;
  banding?: string;
  gender?: string;
};
