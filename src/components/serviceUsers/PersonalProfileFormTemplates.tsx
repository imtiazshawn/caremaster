import { GENDER, MARITAL_STATUS, SEXUALITY } from "$types/common";
import {
  COMMUNICATION_PREFERENCE,
  DNAR,
  EMERGENCY_RATING,
  ENROLLMENT_STATUS,
  FUNERAL_ARRANGEMENT,
  MAIN_DIET,
  PRONOUN,
  REGION,
  SERVICE_LEVEL,
  SERVICE_TYPE,
  SPECIAL_DIET,
  ServiceUser,
  YES_NO_CHOICE,
} from "$types/serviceUsers";
import { PostCodeComponent } from "@components/PostCodeComponent";
import { QRCodeComponent } from "@components/QRCodeComponent";
import { FormTemplate } from "@components/common/SmartForm";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type FormTemplateParams = {
  watch: UseFormWatch<ServiceUser>;
  setValue: UseFormSetValue<ServiceUser>;
};

export const serviceUserForm: FormTemplate<ServiceUser>[] = [
  {
    type: "image",
    label: "Photo",
    name: "photo",
  },

  {
    type: "text",
    label: "Title",
    name: "title",
  },
  {
    type: "text",
    label: "Name",
    name: "name",
  },
  {
    type: "text",
    label: "Referred Name",
    name: "preferred_name",
  },
  {
    type: "column",
    items: [
      {
        type: "date",
        label: "DOB",
        name: "date_of_birth",
      },
      {
        type: "select",
        label: "Gender",
        name: "gender",
        options: Object.values(GENDER),
      },
    ],
  },
  {
    type: "column",
    items: [
      {
        type: "select",
        label: "Gender At Birth",
        name: "gender_at_birth",
        options: Object.values(GENDER),
      },
      {
        type: "select",
        label: "Pronoun",
        name: "pronoun",
        options: Object.values(PRONOUN),
      },
    ],
  },
  {
    type: "column",
    items: [
      {
        type: "select",
        label: "DNAR/RESPECT",
        name: "dnar",
        options: Object.values(DNAR),
      },
      {
        type: "select",
        label: "Sexuality",
        name: "sexuality",
        options: Object.values(SEXUALITY),
      },
    ],
  },
  {
    type: "select",
    label: "Status",
    name: "enrollment_status",
    options: Object.values(ENROLLMENT_STATUS),
  },
];
export const identificationForm = ({
  setValue,
  watch,
}: FormTemplateParams): FormTemplate<ServiceUser>[] => {
  return [
    {
      type: "text",
      label: "NHS / HSC No.",
      name: "nhs_number",
    },
    {
      type: "text",
      label: "NI No.",
      name: "ni_number",
    },
    {
      type: "text",
      label: "Person ID",
      name: "personal_id",
    },
    {
      type: "custom",
      component: (
        <QRCodeComponent
          label='QR'
          value={watch("qr_code")}
          setValue={setValue}
        />
      ),
    },
  ];
};

export const backgroundInfoForm = ({
  setValue,
  watch,
}: FormTemplateParams): FormTemplate<ServiceUser>[] => {
  return [
    {
      type: "select",
      label: "Marital Status",
      name: "marital_status",
      options: Object.values(MARITAL_STATUS),
    },
    {
      type: "text",
      label: "Religion",
      name: "religion",
    },
    {
      type: "text",
      label: "Ethnicity",
      name: "ethnicity",
    },
    {
      type: "select",
      label: "Communication preference",
      name: "communication_preference",
      options: Object.values(COMMUNICATION_PREFERENCE),
    },
    {
      type: "select",
      label: "Emergency Rating",
      name: "emergency_rating",
      options: Object.values(EMERGENCY_RATING),
    },
    {
      type: "custom",
      component: (
        <PostCodeComponent
          setValue={setValue}
          postcode={watch("postcode")}
          labelPosition='left'
          setAddress={(address) => setValue("address", address)}
          setPostcode={(postcode) => setValue("postcode", postcode)}
        />
      ),
    },
    {
      type: "text",
      label: "Address",
      name: "address",
    },
    {
      type: "text",
      label: "Latitude",
      name: "latitude",
    },
    {
      type: "text",
      label: "Longitude",
      name: "longitude",
    },
    {
      type: "select",
      label: "Region",
      name: "region",
      options: Object.values(REGION),
    },
    {
      type: "text",
      label: "Key Safe Code",
      name: "key_safe_code",
    },
    {
      type: "text",
      label: "Access Details",
      name: "access_details",
    },
    {
      type: "text",
      label: "Telephone",
      name: "telephone",
    },
    {
      type: "text",
      label: "Mobile",
      name: "mobile",
    },
    {
      type: "text",
      label: "Email",
      name: "email",
    },
  ];
};

export const councilForm: FormTemplate<ServiceUser>[] = [
  {
    type: "text",
    label: "Council : Service User ID",
    name: "council_service_user_id",
  },
  {
    type: "text",
    label: "Council : Care Provider ID",
    name: "council_care_provider_id",
  },
  {
    type: "select",
    label: "Service Type",
    name: "service_type",
    options: Object.values(SERVICE_TYPE),
  },
  {
    type: "select",
    label: "Service Level",
    name: "service_level",
    options: Object.values(SERVICE_LEVEL),
  },
];

export const othersForm: FormTemplate<ServiceUser>[] = [
  {
    type: "date",
    label: "Start Date",
    name: "admission_date",
  },
  {
    type: "text",
    label: "Banding",
    name: "banding",
  },
  {
    type: "text",
    label: "Authority/Category",
    name: "authority",
  },
  {
    type: "select",
    label: "Funeral Arrangements",
    name: "funeral_arrangement",
    options: Object.values(FUNERAL_ARRANGEMENT),
  },
  {
    type: "text",
    label: "Funeral Director",
    name: "funeral_director",
  },
  {
    type: "text",
    label: "Height (m)",
    name: "height",
  },
  {
    type: "text",
    label: "Weight (kg)",
    name: "weight",
  },
  {
    type: "text",
    label: "BMI (kg/m2)",
    name: "bmi",
  },
  {
    type: "text",
    label: "Medical History",
    name: "medical_history",
  },
  {
    type: "text",
    label: "Medicine Allergies",
    name: "medicine_allergies",
  },
  {
    type: "select",
    label: "Oxygen",
    name: "oxygen",
    options: Object.values(YES_NO_CHOICE),
  },
  {
    type: "select",
    label: "On Catheter",
    name: "on_catheter",
    options: Object.values(YES_NO_CHOICE),
  },
  {
    type: "text",
    label: "Food Allergies",
    name: "food_allergies",
  },
  {
    type: "select",
    label: "Nil By Mouth",
    name: "nil_by_mouth",
    options: Object.values(YES_NO_CHOICE),
  },
  {
    type: "select",
    label: "Main Diet",
    name: "main_diet",
    options: Object.values(MAIN_DIET),
  },
  {
    type: "select",
    label: "Special Diets",
    name: "special_diet",
    options: Object.values(SPECIAL_DIET),
  },
  {
    type: "text",
    label: "Instructions",
    name: "diet_instruction",
  },
];
