import { EmploymentHistoryForm } from "$types/applicants";
import IconButton from "@common/IconButton";
import { LoadingButton } from "@common/LoadingButton";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { FlexBox, FullColumn } from "@common/index";
import { Button } from "@mui/material";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

type Template = Record<`${string}.${keyof EmploymentHistoryForm}`, unknown>;

export const EmploymentHistory = () => {
  const { control, handleSubmit, reset } = useForm<EmploymentHistoryForm>();
  const [employmentIds, setEmploymentIds] = useState([0]);
  const [count, setCount] = useState(0);

  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  const { data: applicantData, refetch } = useGetApplicantQuery(uid as string);
  const [updateAnswer, { isLoading: isUpdateLoading }] =
    useUpdateApplicantMutation();

  const handleDelete = (id: number) => {
    setEmploymentIds((employmentIds) =>
      employmentIds.filter((employment) => employment !== id),
    );
  };

  useEffect(() => {
    if (applicantData?.employment_history) {
      const ids = [];
      for (let i = 0; i < applicantData.employment_history.length; i++) {
        ids.push(i);
      }
      setEmploymentIds(ids);

      reset({ ...applicantData.employment_history });
    }
  }, [reset, applicantData]);

  const templates: FormTemplate<Template>[][] = employmentIds.map((id) => [
    {
      type: "column",
      items: [
        {
          name: `${id}.startDate`,
          type: "date",
          label: "Start Date",
          required: true,
        },
        {
          name: `${id}.endDate`,
          type: "date",
          label: "End Date",
          required: true,
        },
        {
          name: `${id}.employersName`,
          type: "text",
          label: "Employers Name",
          required: true,
        },
        {
          name: `${id}.employersAddress`,
          type: "text",
          label: "Employers Address",
          required: true,
        },
        {
          name: `${id}.job`,
          type: "text",
          label: "Job Held",
          required: true,
        },
        {
          name: `${id}.reasonforLeaving`,
          type: "text",
          label: "Reason for Leaving",
          required: true,
        },
        {
          type: "custom",
          component: (
            <div className='mr-0 pt-8'>
              <IconButton
                variant='delete'
                fontSize='large'
                disabled={employmentIds.length === 1} // Prevents deleting the last item
                onClick={() => handleDelete(id)}
              />
            </div>
          ),
        },
      ],
    },
  ]);

  const handleFormSubmit = async (values: Template) => {
    const payload = Object.entries(values)
      .filter(([key]) => employmentIds.includes(Number.parseInt(key)))
      .map(([, value]) => value);

    if (applicantData) {
      updateAnswer({
        employment_history: JSON.stringify(payload) as any,
        first_name: applicantData.first_name,
        email: applicantData.email,
        unique_id: applicantData.unique_id,
      }).then(() => {
        ShowShortMessage("Saved successfully");
        refetch();
      });
    }
  };

  return (
    <FullColumn className='p-4'>
      <h2 className='text-lg'>
        Please give details of all jobs held in the last ten years including
        part time and unpaid work starting with our current or most recent
        employer
      </h2>

      <form
        className='p-4'
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <FlexBox className='flex-col items-center justify-center'>
          {templates.map((template, index: number) => {
            return (
              <div
                key={employmentIds[index]}
                className='my-2'
              >
                <SmartForm
                  control={control}
                  template={template}
                  labelPosition='top'
                />
              </div>
            );
          })}
        </FlexBox>
        <FlexBox className='items-cente my-12 justify-between '>
          <Button
            variant='contained'
            size='large'
            onClick={() => {
              setEmploymentIds((employmentIds) => {
                return [...employmentIds, count + 1];
              });
              setCount((count) => count + 1);
            }}
          >
            Add New
          </Button>
          <FlexBox className='items-center justify-center'>
            <LoadingButton
              type='submit'
              variant='contained'
              size='large'
              loading={isUpdateLoading}
            >
              Save
            </LoadingButton>
            <LoadingButton
              type='submit'
              variant='contained'
              size='large'
              href={`/care-worker/apply/education-history?uid=${uid}`}
            >
              Next
            </LoadingButton>
          </FlexBox>
        </FlexBox>
      </form>
    </FullColumn>
  );
};
