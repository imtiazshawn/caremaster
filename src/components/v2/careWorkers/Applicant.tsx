import { ActionType, Applicant } from "$types/applicants";
import { getApplicationStatus } from "@/helper/apply";
import { COLORS } from "@/shared/constants/colors";
import { CareWorkerCard } from "@/v2/components/CareWorkerCard";
import IconButton from "@common/IconButton";
import ShowShortMessage from "@common/ShortMessage";
import { FlexBox, FullColumn } from "@common/index";
import ConfirmationDialog from "@components/modals/ConfirmationModal";

import { useAcceptApplicantMutation } from "@reducers/api/acceptApplicant";

import {
  useGetApplicantsQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const AppliedTab = () => {
  const {
    data: applicants,
    isLoading: isLoadingApplicants,
    refetch,
  } = useGetApplicantsQuery(null);
  const [updateApplicant] = useUpdateApplicantMutation();
  const [acceptApplicant] = useAcceptApplicantMutation();
  const { data: questions } = useGetCareWorkerQuestionsQuery(null);
  const [selectedUid, setSelectedUid] = useState<null | string>(null);
  const [modalType, setModalType] = useState<ActionType>("accept");

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

  const questionsIds = questions.map((question) => question.id.toString());
  const onSubmitHandler = (unique_id: string) => {
    const applicant = applicants.find(
      ({ unique_id: id }) => id === unique_id,
    ) as Applicant;
    acceptApplicant({ unique_id: applicant.unique_id }).then(() => {
      updateApplicant({
        unique_id: applicant.unique_id,
        application_status: JSON.stringify({
          ...applicant.application_status,
          is_application_accepted: modalType === "accept",
        }) as any,
      }).then(() => {
        refetch();
      });
    });
    ShowShortMessage(`Applicant ${modalType}ed successfully`);
  };

  const handleAction = (unique_id: string, actionType: ActionType) => {
    setSelectedUid(unique_id);
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
        isOpen={Boolean(selectedUid)}
        onCancel={() => {
          setSelectedUid(null);
        }}
        onOk={() => {
          onSubmitHandler(selectedUid as string);
          setSelectedUid(null);
        }}
      />

      {filteredApplicants?.map((applicant) => {
        const { completedCount, total } = getApplicationStatus(
          applicant,
          questionsIds,
        );

        return (
          <Link
            key={`/v2/staff/applied/${applicant.unique_id}/personal-details`}
            to={`/v2/staff/applied/${applicant.unique_id}/personal-details`}
          >
            <CareWorkerCard
              careWorker={{
                id: applicant.unique_id,
                user: {
                  name: applicant.first_name,
                  email: applicant.email,
                  phone: applicant.phone,
                },
                photo: applicant?.documents?.passport_size_photo,
                completedCount: completedCount,
                total: total,
              }}
              onClick={() => null}
              key={applicant.unique_id}
            >
              <FlexBox>
                <IconButton
                  variant='check'
                  onClick={(e) => {
                    e.preventDefault();
                    handleAction(applicant.unique_id, "accept");
                  }}
                />
                <IconButton
                  variant='close'
                  onClick={(e) => {
                    e.preventDefault();
                    handleAction(applicant.unique_id, "remove");
                  }}
                />
              </FlexBox>
            </CareWorkerCard>
          </Link>
        );
      })}
      {filteredApplicants.length === 0 && !isLoading && (
        <FlexBox sx={{ fontSize: "1.5em", justifyContent: "center" }}>
          No new applicants
        </FlexBox>
      )}
    </FullColumn>
  );
};

export default AppliedTab;
