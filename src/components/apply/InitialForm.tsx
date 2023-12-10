import { applicantSchema } from "@/formSchemas/aplicants";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { H2, H4 } from "@common/Typography";
import { PostCodeComponent } from "@components/PostCodeComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  useCreateApplicantMutation,
  useGetApplicantsQuery,
} from "@reducers/api/applicants";
import React from "react";
import { useForm } from "react-hook-form";

type CreateApplicant = {
  first_name: string;
  surname: string;
  email: string;
  address: string;
  postcode: string;
};

const defaultValues: CreateApplicant = {
  first_name: "",
  surname: "",
  email: "",
  postcode: "",
  address: "",
};
const InitialForm: React.FC = () => {
  const { handleSubmit, control, setValue } = useForm<CreateApplicant>({
    defaultValues: defaultValues,
    resolver: yupResolver(applicantSchema),
  });

  const { refetch } = useGetApplicantsQuery(null);
  const [createApplicant, { isLoading }] = useCreateApplicantMutation();
  const [showSuccess, setShowSuccess] = React.useState<boolean>(false);

  const formTemplate: FormTemplate<CreateApplicant>[] = [
    {
      name: "first_name",
      type: "text",
      label: "First Name",
    },
    {
      name: "surname",
      type: "text",
      label: "Surname",
    },
    {
      name: "email",
      type: "text",
      label: "Email",
    },
    {
      type: "custom",
      component: (
        <PostCodeComponent
          labelPosition='top'
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

  const handleFormSubmit = async (values: CreateApplicant) => {
    createApplicant(values).then(() => {
      setShowSuccess(true);
      ShowShortMessage("Applied successfully");
      refetch();
    });
  };

  return (
    <div>
      <div className='flex h-screen w-full  flex-col items-center justify-center'>
        <div className=' w-1/3 rounded-lg bg-white p-10 shadow-2xl'>
          <div className='my-5 flex w-full items-center justify-center'>
            <H2 className='font-sans text-lg'>Application Form</H2>
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
                loading={isLoading}
                variant='contained'
              >
                Apply
              </LoadingButton>
            </div>
            {showSuccess ? (
              <div className='mx-6 mb-6 mt-6 flex justify-center'>
                <H4 className='text-center text-green-500'>
                  Please check your email to continue
                </H4>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InitialForm;
