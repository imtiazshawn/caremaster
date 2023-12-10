import { Reference, ReferenceComment } from "$types/reference";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { H2, H4 } from "@common/Typography";
import { LoadingButton } from "@mui/lab";
import {
  useGetReferenceQuery,
  useUpdateReferenceMutation,
} from "@reducers/api/reference";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

type FormReference = Omit<Reference, "comment"> & ReferenceComment;
const ProvideReference: React.FC = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  const { data: reference, refetch } = useGetReferenceQuery(uid as string);
  const [updateReference] = useUpdateReferenceMutation();
  const { handleSubmit, reset, control } = useForm<FormReference>();

  useEffect(() => {
    if (reference) {
      reset({
        name: reference.name,
        email: reference.email,
        telephone: reference.telephone,
        company: reference.company,
        job_title: reference.job_title,
        address: reference.address,
        applicant: reference.applicant,
        id: reference.id,
        reason_for_leaving: reference.comment?.reason_for_leaving,
        doYouRefer: reference.comment?.doYouRefer,
        summary_of_duties: reference.comment?.summary_of_duties,
      });
    }
  }, [reference, reset]);

  const formTemplate: FormTemplate<FormReference>[] = [
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Name",
          name: "name",
          isDisabled: true,
        },
        {
          type: "text",
          label: "Email",
          name: "email",
          isDisabled: true,
        },
        {
          type: "text",
          label: "Phone",
          name: "telephone",
          isDisabled: true,
        },
      ],
    },
    {
      type: "column",
      items: [
        {
          type: "text",
          label: "Company",
          name: "company",
          isDisabled: true,
        },
        {
          type: "text",
          label: "Job Title",
          name: "job_title",
          isDisabled: true,
        },
        {
          type: "text",
          label: "Address",
          name: "address",
          isDisabled: true,
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
          required: true,
        },
      ],
    },
    {
      type: "text-area",
      label: "Summary of Duties",
      name: "summary_of_duties",
      required: true,
    },
    {
      type: "radio-group",
      label: "Do you refer us this person?",
      name: "doYouRefer",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      required: true,
    },
  ];

  const handleFormSubmit = async (value: FormReference) => {
    await updateReference({
      comment: JSON.stringify({
        reason_for_leaving: value.reason_for_leaving,
        doYouRefer: value.doYouRefer,
        summary_of_duties: value.summary_of_duties,
      }) as any,
      applicant: value.applicant,
      id: value.id,
      is_confirmed: true,
    });
    ShowShortMessage("Thanks for the referral!");
    refetch();
  };

  return (
    <div>
      <div className='flex h-screen w-full  flex-col items-center justify-center'>
        <div className=' w-2/3 rounded-lg bg-white p-10 shadow-2xl'>
          {true ? (
            <>
              <div className='my-5 flex w-full items-center justify-center'>
                <H2 className='font-sans text-lg'>Reference Form</H2>
              </div>
              <div className='my-4 w-full'>
                <H4>Hey please provide reference... </H4>
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
            </>
          ) : (
            <div className='my-5 flex w-full items-center justify-center'>
              <H4 className='font-sans text-lg'>Thanks for submitting</H4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProvideReference;
