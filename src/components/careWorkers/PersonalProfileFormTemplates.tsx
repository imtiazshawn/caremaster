import { EMPLOYMENT_STATUS, UpdateCareWorkerReq } from "$types/careWorkers";
import { GENDER, MARITAL_STATUS } from "$types/common";
import { PostCodeComponent } from "@components/PostCodeComponent";
import { HookFormFileUpload } from "@components/common/HookFormFIleUpload";
import { FormTemplate } from "@components/common/SmartForm";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";

type FormTemplateParams = {
  watch: UseFormWatch<UpdateCareWorkerReq>;
  setValue: UseFormSetValue<UpdateCareWorkerReq>;
};

export const getDetailsCareWorkerForm = ({
  setValue,
  watch,
}: FormTemplateParams): FormTemplate<UpdateCareWorkerReq>[] => {
  return [
    {
      type: "custom",
      component: (
        <HookFormFileUpload
          label='Photo'
          value={watch("photo")}
          setValue={(newFile: File) => setValue("photo", newFile)}
        />
      ),
    },
    {
      type: "text",
      label: "First Name",
      name: "first_name",
    },
    {
      type: "text",
      label: "Last Name",
      name: "last_name",
    },
    {
      type: "text",
      label: "Username",
      name: "preferred_name",
    },
    {
      type: "text",
      label: "Email",
      name: "email",
    },

    {
      type: "date",
      label: "Start Date",
      name: "start_date",
    },
    {
      type: "date",
      label: "Leave Date",
      name: "leave_date",
    },
    {
      type: "select",
      label: "Gender",
      name: "gender",
      options: Object.values(GENDER),
    },
    {
      type: "text",
      label: "Mobile Number",
      name: "phone",
    },
  ];
};
/* eslint-disable */
export const getRoleAndAccessForm = (
  _: FormTemplateParams,
): FormTemplate<UpdateCareWorkerReq>[] => {
  /* eslint-enable */
  return [
    {
      type: "text",
      label: "NI No.",
      name: "ni_number",
    },
    {
      type: "select",
      label: "Status",
      name: "employment_status",
      options: Object.values(EMPLOYMENT_STATUS),
    },
    {
      type: "text",
      label: "Pin",
      name: "pin",
    },
  ];
};

export const getBackgroundForm = ({
  setValue,
}: FormTemplateParams): FormTemplate<UpdateCareWorkerReq>[] => {
  return [
    {
      type: "select",
      label: "Marital Status",
      name: "marital_status",
      options: Object.values(MARITAL_STATUS),
    },
    {
      type: "text",
      label: "Ethnicity",
      name: "ethnicity",
    },
    {
      type: "text",
      label: "Nationality",
      name: "nationality",
    },
    {
      type: "custom",
      component: (
        <PostCodeComponent
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
  ];
};

export const getEmergencyContactForm =
  (): FormTemplate<UpdateCareWorkerReq>[] => {
    return [
      {
        type: "text",
        label: "Emergency Name",
        name: "emergency_name",
      },
      {
        type: "text",
        label: "Emergency Number",
        name: "emergency_number",
      },
      {
        type: "text",
        label: "Emergency Note",
        name: "emergency_note",
      },
    ];
  };

export const getVaccinesForm = (): FormTemplate<UpdateCareWorkerReq>[] => {
  return [];
};
