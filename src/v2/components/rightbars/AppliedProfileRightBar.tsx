import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { Button } from "@common/Button";
import ShowShortMessage from "@common/ShortMessage";
import { Column } from "@common/index";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import { useUpdateApplicantMutation } from "@reducers/api/applicants";
import { useApplicant } from "@shared/hooks/useApplied";
import { useState } from "react";

export const AppliedProfileRightBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateApplicant] = useUpdateApplicantMutation();
  const { applicant, refetch } = useApplicant();

  const deleteApplicant = () => {
    updateApplicant({
      unique_id: applicant?.unique_id as string,
      application_status: JSON.stringify({
        ...applicant?.application_status,
        is_application_accepted: false,
      }) as any,
    }).then(() => {
      refetch();
      setIsModalOpen(false);
      ShowShortMessage("Applicant has been archived");
    });
  };
  const isDeleted =
    applicant?.application_status?.is_application_accepted === false;

  return (
    <Column
      sx={{
        gap: 3,
        marginTop: "2.5rem",
        width: ["20rem", "23rem", "23rem", "23rem", "23rem"],
      }}
    >
      <ConfirmationDialog
        title='Please confirm'
        description='Are you sure you want to delete this applicant?'
        isOpen={isModalOpen}
        onOk={() => {
          deleteApplicant();
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
      <Button
        variant='contained'
        color='error'
        disabled={isDeleted}
        sx={{
          height: "4rem",
          fontSize: "1rem",
          borderRadius: ".8rem",
        }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {isDeleted ? "Applicant Has Been Archived " : "Archive Applicant"}
      </Button>
      <MaintenanceRightBar
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "50rem",
          p: 4,
        }}
      />
    </Column>
  );
};
