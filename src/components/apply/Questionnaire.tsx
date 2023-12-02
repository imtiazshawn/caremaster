import { Applicant, CreateApplicant } from "$types/applicants";
import { CareWorkerQuestion } from "$types/careWorkerQuestions";
import { ProfileSectionProps } from "$types/profile";
import { LoadingButton } from "@common/LoadingButton";
import ShowShortMessage from "@common/ShortMessage";
import { FormTemplate, SmartForm } from "@common/SmartForm";
import { FlexBox } from "@common/index";
import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

type Template = Record<string, unknown>;

export const Questionnaire = ({
  data,
  isUpdateLoading,
  refetch,
  update,
  nextUrl,
}: ProfileSectionProps<Applicant, CreateApplicant & { unique_id: string }>) => {
  const { control, handleSubmit, reset } = useForm<Template>();
  const { data: questions } = useGetCareWorkerQuestionsQuery(null);

  useEffect(() => {
    if (data) {
      reset({
        experience: data.experience,
        ...data.interview_answers,
      });
    }
  }, [reset, data]);

  if (!data || !questions) {
    return <></>;
  }

  const formTemplate: FormTemplate<Template>[] = questions.map(
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
    if (data) {
      const { experience, ...answers } = value;

      update({
        interview_answers: JSON.stringify(answers) as any,
        experience: experience as string,
        first_name: data.first_name,
        email: data.email,
        unique_id: data.unique_id,
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
            href={nextUrl}
          >
            Next
          </LoadingButton>
        </FlexBox>
      </form>
    </div>
  );
};
