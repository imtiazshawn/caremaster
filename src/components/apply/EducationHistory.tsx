import {
  Applicant,
  EducationHistoryForm,
  EmploymentHistoryForm,
} from "$types/applicants";
import { DynamicList } from "@common/DynamicList";
import IconButton from "@common/IconButton";
import { FormTemplate } from "@common/SmartForm";
import {
  useGetApplicantQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useSearchParams } from "react-router-dom";

type Template = Record<`${string}.${keyof EducationHistoryForm}`, unknown>;

export const EducationHistory = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  const { data: applicantData, refetch } = useGetApplicantQuery(uid as string);
  const [updateAnswer, { isLoading: isUpdateLoading }] =
    useUpdateApplicantMutation();

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
  if (!applicantData || !uid) {
    return <></>;
  }
  const header = `Please name any institute or professional body in full and include attainment level.`;
  return (
    <DynamicList<EmploymentHistoryForm, Template, Applicant>
      getTemplates={getTemplates}
      data={applicantData}
      topic='qualification'
      update={updateAnswer}
      refetch={refetch}
      injectParams={(payload) => ({
        qualification: JSON.stringify(payload) as any,
        id: applicantData.id,
        first_name: applicantData.first_name,
        email: applicantData.email,
        unique_id: applicantData.unique_id,
      })}
      isUpdateLoading={isUpdateLoading}
      header={header}
      next={`/care-worker/apply/documents?uid=${uid}`}
    />
  );
};
