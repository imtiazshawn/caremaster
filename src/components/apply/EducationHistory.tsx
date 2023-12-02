import {
  Applicant,
  CreateApplicant,
  EducationHistoryForm,
  EmploymentHistoryForm,
} from "$types/applicants";
import { ProfileSectionProps } from "$types/profile";
import { DynamicList } from "@common/DynamicList";
import IconButton from "@common/IconButton";
import { FormTemplate } from "@common/SmartForm";

type Template = Record<`${string}.${keyof EducationHistoryForm}`, unknown>;

export const EducationHistory = ({
  data,
  isDataLoading,
  refetch,
  update,
  isUpdateLoading,
  nextUrl,
}: ProfileSectionProps<Applicant, CreateApplicant & { unique_id: string }>) => {
  const getTemplates = (
    id: number,
    handleDelete: (id: number) => void,
    employmentIdsLength: number,
  ): FormTemplate<Template>[] => [
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
          name: `${id}.qualificaiton`,
          type: "text",
          label: "Qualification",
          required: true,
        },
        {
          name: `${id}.awarding_body`,
          type: "text",
          label: "Awarding Body",
          required: true,
        },
        {
          type: "custom",
          component: (
            <div className='mr-0 pt-8'>
              <IconButton
                variant='delete'
                fontSize='large'
                disabled={employmentIdsLength === 1} // Prevents deleting the last item
                onClick={() => handleDelete(id)}
              />
            </div>
          ),
        },
      ],
    },
  ];
  if (isDataLoading || !data) {
    return <></>;
  }
  const header = `Please name any institute or professional body in full and include attainment level.`;
  return (
    <DynamicList<EmploymentHistoryForm, Template, Applicant>
      getTemplates={getTemplates}
      data={data}
      topic='qualification'
      update={update}
      refetch={refetch}
      injectParams={(payload) => ({
        qualification: JSON.stringify(payload) as any,
        id: data.id,
        first_name: data.first_name,
        email: data.email,
        unique_id: data.unique_id,
      })}
      isUpdateLoading={isUpdateLoading}
      header={header}
      next={nextUrl}
    />
  );
};
