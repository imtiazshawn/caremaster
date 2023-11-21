import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { H2 } from "@common/Typography";
import { LoadingButton } from "@mui/lab";
import React from "react";
import { useForm } from "react-hook-form";

type Reference = {
  first_name: string;
  last_name: string;
  company: string;
  position: string;
  telephone: string;
  from: Date;
  to: Date;
  reason_for_leaving: string;
  summary: string;
  declineReferring: boolean;
};

const ProvideReference: React.FC = () => {
  // const [searchParams] = useSearchParams();
  // const uid = searchParams.get("uid");

  const { handleSubmit, control } = useForm<Reference>({
    // defaultValues: defaultValues,
    // resolver: yupResolver(aplicentSchema),
  });
  const formTemplate: FormTemplate<Reference>[] = [
    {
      type: "column",
      items: [
        {
          name: "first_name",
          type: "text",
          label: "Referee First Name",
        },
        {
          name: "last_name",
          type: "text",
          label: "Referee Last Name",
        },
        {
          name: "company",
          type: "text",
          label: "Company Name",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          name: "position",
          type: "text",
          label: "Position Held",
        },
        {
          name: "from",
          type: "date",
          label: "Date From",
        },
        {
          name: "to",
          type: "text",
          label: "Date to",
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          name: "reason_for_leaving",
          type: "text",
          label: "Reason For Leaving",
        },
        {
          name: "telephone",
          type: "text",
          label: "Telephone Number",
        },
        {
          name: "to",
          type: "text",
          label: "Date to",
        },
      ],
    },
    {
      type: "text-area",
      label: "Summary of Duties",
      name: "summary",
    },
    {
      type: "radio-group",
      label: "Do you refer us this person?",
      name: "declineReferring",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  ];

  const handleFormSubmit = async () => {
    ShowShortMessage("Thanks for the referral!");
  };

  return (
    <div>
      <div className='flex h-screen w-full  flex-col items-center justify-center'>
        <div className=' w-2/3 rounded-lg bg-white p-10 shadow-2xl'>
          <div className='my-5 flex w-full items-center justify-center'>
            <H2 className='font-sans text-lg'>Reference Form</H2>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <SmartForm
              control={control}
              template={formTemplate}
              labelPosition='top'
            />

            <div className='mx-6 mb-6 mt-12 flex justify-center'>
              <LoadingButton
                type='submit'
                // loading={isLoading}
                variant='contained'
              >
                Submit
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProvideReference;
