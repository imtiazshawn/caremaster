import {
  GENDER,
  MARITAL_STATUS,
  RACE,
  RELIGION,
  SEXUALITY,
} from "$types/common";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { useForm } from "react-hook-form";

type EqualMonitoringForm = {
  gender: string;
  maritalStatus: string;
  ageBand: string;
  sexOrientation: string;
  disabilities: string;
  race: string;
  religion: string;
};

export const EqualMonitoring = () => {
  const { control } = useForm<EqualMonitoringForm>();

  const equalMonitoringFormTemplate: FormTemplate<EqualMonitoringForm>[] = [
    {
      name: "gender",
      type: "select",
      label: "Gender",
      options: Object.values(GENDER),
    },
    {
      name: "maritalStatus",
      type: "select",
      label: "Marital Status",
      options: Object.values(MARITAL_STATUS),
    },
    {
      name: "ageBand",
      type: "select",
      label: "Age Bond",
      options: ["16-24", "25-34", "35-44", "45-54", "55+"],
    },
    {
      name: "sexOrientation",
      type: "select",
      label: "Sexual Orientation",
      options: Object.values(SEXUALITY),
    },
    {
      name: "disabilities",
      label: "Disabilities",
      type: "select",
      options: ["Physical", "None", "Prefer not to say"],
    },
    {
      name: "race",
      label: "Race/Ethnic origin",
      type: "select",
      options: Object.values(RACE),
    },
    {
      name: "religion",
      label: "Religion:",
      type: "select",
      options: Object.values(RELIGION),
    },
  ];

  return (
    <div className='pb-4 pt-2'>
      <form>
        <SmartForm
          control={control}
          template={equalMonitoringFormTemplate}
          labelPosition='top'
        />
      </form>
    </div>
  );
};
