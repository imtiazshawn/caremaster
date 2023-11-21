import { DBSForm } from "$types/applicants";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { useForm } from "react-hook-form";

export const DBS = () => {
  const { control } = useForm<DBSForm>();

  const DBSFormTemplate: FormTemplate<DBSForm>[] = [
    {
      type: "text",
      label: "National Id number",
      name: "ni_number",
    },
    {
      name: "passport_number",
      label: "Passport Number",
      type: "text",
    },
    {
      name: "passport_expiry_date",
      label: "Passport Expiry Date:",
      type: "date",
    },
    {
      name: "has_driving_license",
      label: "Do you have Driving License",
      type: "select",
      options: ["yes", "no"],
    },
    {
      name: "has_convictions_endorsements",
      label: "Do you have any convictions or endorsements",
      type: "select",
      options: ["yes", "no"],
    },
    {
      name: "is_disabled_person",
      label: "Are you a disabled Person",
      type: "select",
      options: ["yes", "no"],
    },
  ];

  return (
    <div className='p-4'>
      <form>
        <SmartForm
          control={control}
          template={DBSFormTemplate}
          labelPosition='top'
        />
      </form>
    </div>
  );
};
