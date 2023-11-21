import { CareWorkerQuestion } from "$types/careWorkerQuestions";
import { LoadingButton } from "@common/LoadingButton";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { FlexBox } from "@common/index";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

type Template = Record<string, unknown>;

export const Questionnaire = () => {
  const { data } = useGetCareWorkerQuestionsQuery(null);
  const { control, handleSubmit, reset } = useForm<Template>();
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  const { data: applicantData, refetch } = useGetApplicantQuery(uid as string);

  const [updateAnswer, { isLoading: isUpdateLoading }] =
    useUpdateApplicantMutation();

  useEffect(() => {
    if (applicantData) {
      reset({
        experience: applicantData.experience,
        ...applicantData.interview_answers,
      });
    }
  }, [reset, applicantData]);

  if (!data) {
    return <></>;
  }

  const formTemplate: FormTemplate<Template>[] = data.map(
    ({ question, id }: CareWorkerQuestion) => {
      const questionTemplate = {
        type: "text-area",
        name: `${id}`,
        label: question,
        rows: 4,
        // required: true,
      } as const;
      return questionTemplate;
    },
  );

  const experienceTemplate: FormTemplate<{ experience: string }>[] = [
    {
      type: "text-area",
      name: "experience",
      label: "Details of Skills/Experience",
      rows: 5,
    },
  ];
  const handleFormSubmit = (value: Template) => {
    if (applicantData) {
      const { experience, ...answers } = value;

      updateAnswer({
        interview_answers: JSON.stringify(answers) as any,
        experience: experience as string,
        first_name: applicantData.first_name,
        email: applicantData.email,
        unique_id: applicantData.unique_id,
      }).then(() => {
        refetch();
        ShowShortMessage("Saved successfully");
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='pt-4'>
          <SmartForm
            template={experienceTemplate}
            control={control}
            labelPosition='top'
          />
        </div>
        <div className='pt-4'>
          <SmartForm
            template={formTemplate}
            control={control}
            labelPosition='top'
          />
        </div>
        <FlexBox className='my-12 items-center justify-end'>
          <LoadingButton
            type='submit'
            variant='contained'
            size='large'
            loading={isUpdateLoading}
          >
            Save
          </LoadingButton>
          <LoadingButton
            variant='contained'
            size='large'
            href={`/care-worker/apply/employment-history?uid=${uid}`}
          >
            Next
          </LoadingButton>
        </FlexBox>
      </form>
    </div>
  );
};
