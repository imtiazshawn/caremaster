import { Applicant } from "$types/applicants";
import getAppliedColumns, {
  ActionType,
} from "@/columns/column.careWorker.applied";
import { COLORS } from "@/shared/constants/colors";
import ShowShortMessage from "@common/ShortMessage";
import { Table } from "@common/Table";
import { FullColumn } from "@common/index";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import { useAcceptApplicantMutation } from "@reducers/api/acceptApplicant";

import {
  useGetApplicantsQuery,
  useUpdateApplicantMutation,
} from "@reducers/api/applicants";
import { useGetCareWorkerQuestionsQuery } from "@reducers/api/careWorkerQuestions";
import { useMemo, useState } from "react";

const AppledTab = () => {
  const {
    data: applicants,
    isLoading: isLoadingApplicants,
    refetch,
  } = useGetApplicantsQuery(null);
  const [updateApplicant] = useUpdateApplicantMutation();
  const [acceptApplicant] = useAcceptApplicantMutation();
  const { data: questions } = useGetCareWorkerQuestionsQuery(null);
  const [selectedRowIndex, setselectedRowIndex] = useState<null | string>(null);
  const [modalType, setModalType] = useState<ActionType>("accept");

  const rows = useMemo(
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
    setselectedRowIndex(unique_id);
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
          setselectedRowIndex(null);
        }}
        onOk={() => {
          onSubmitHandler(selectedRowIndex as string);
          setselectedRowIndex(null);
        }}
      />
      <Table<Applicant>
        // rows={applicants}
        // sx={{  }}

        rows={rows}
        columns={getAppliedColumns(questionsIds, handleAction)}
        isLoading={isLoading}
        // onRowClick={({ row }) =>
        //   navigate(
        //     `/care-workers/applied/personal-details?uid=${row.unique_id}`,
        //   )
        // }
      />
    </FullColumn>
  );
};

export default AppledTab;
