import { Applicant } from "$types/applicants";
import { ActionType } from "@/columns/column.careWorker.applied";
import { COLORS } from "@/shared/constants/colors";
import { CareWorkerCard } from "@/v2/components/CareWorkerCard";
import ShowShortMessage from "@common/ShortMessage";
import { FlexBox, FullColumn } from "@common/index";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import { Check, Close } from "@mui/icons-material";
import { useAcceptApplicantMutation } from "@reducers/api/acceptApplicant";

import {
  useGetApplicantsQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppliedTab = () => {
  const {
    data: applicants,
    isLoading: isLoadingApplicants,
    refetch,
  } = useGetApplicantsQuery(null);
  const [updateApplicant] = useUpdateApplicantMutation();
  const [acceptApplicant] = useAcceptApplicantMutation();
  const { data: questions } = useGetCareWorkerQuestionsQuery(null);
  const [selectedRowIndex, setSelectedRowIndex] = useState<null | string>(null);
  const [modalType, setModalType] = useState<ActionType>("accept");
  const navigate = useNavigate();

  const filteredApplicants = useMemo(
    () =>
      applicants?.filter((applicant) => {
        const is_application_accepted =
          applicant?.application_status?.is_application_accepted;
        return (
          is_application_accepted === null ||
          is_application_accepted === undefined
        );
      }) ?? [],
    [applicants],
  );
  const isLoading = !applicants || isLoadingApplicants || !questions;
  if (isLoading) {
    return <></>;
  }

  // const questionsIds = questions.map((question) => question.id.toString());
  const onSubmitHandler = (unique_id: string) => {
    const applicant = applicants.find(
      ({ unique_id: id }) => id === unique_id,
    ) as Applicant;
    acceptApplicant({ unique_id: applicant.unique_id }).then(() => {
      updateApplicant({
        unique_id: applicant.unique_id,
        email: applicant.email,
        first_name: applicant.first_name,
        application_status: JSON.stringify({
          ...applicant.application_status,
          is_application_accepted: modalType === "accept",
        }) as any,
      }).then(() => {
        refetch();
      });
    });
    ShowShortMessage(`Applicant ${modalType}ed successfully`);

    // const careWokerData = getCareWorkerData(applicant);
  };

  const handleAction = (unique_id: string, actionType: ActionType) => {
    setSelectedRowIndex(unique_id);
    setModalType(actionType);
  };

  const modalDescription =
    modalType === "accept"
      ? "Are you sure you want to accept this applicant?"
      : "Are you sure you want to remove this applicant?";
  return (
    <FullColumn sx={{ background: COLORS.WHITE }}>
      <ConfirmationDialog
        title='Please confirm'
        description={modalDescription}
        isOpen={Boolean(selectedRowIndex)}
        onCancel={() => {
          setSelectedRowIndex(null);
        }}
        onOk={() => {
          onSubmitHandler(selectedRowIndex as string);
          setSelectedRowIndex(null);
        }}
      />

      {filteredApplicants?.map((applicant) => (
        <CareWorkerCard
          careWorker={{
            id: applicant.unique_id,
            user: {
              name: applicant.first_name,
            },
          }}
          onClick={() =>
            navigate(
              `/care-workers/applied/personal-details?uid=${applicant.unique_id}`,
            )
          }
          key={applicant.unique_id}
        >
          <FlexBox>
            <Check
              onClick={(e) => {
                e.stopPropagation();
                handleAction(applicant.unique_id, "accept");
              }}
            />
            <Close
              onClick={(e) => {
                e.stopPropagation();
                handleAction(applicant.unique_id, "remove");
              }}
            />
          </FlexBox>
        </CareWorkerCard>
      ))}
      {filteredApplicants.length === 0 && !isLoading && (
        <FlexBox sx={{ fontSize: "1.5em", justifyContent: "center" }}>
          No new applicants
        </FlexBox>
      )}
    </FullColumn>
  );
};

export default AppliedTab;
