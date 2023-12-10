import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { Button } from "@common/Button";
import { Column } from "@common/index";
import ConfirmationDialog from "@components/modals/ConfirmationModal";
import { useScreening } from "@shared/hooks/useScreening";
import { useState } from "react";

export const ScreeningProfileRightBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { screening } = useScreening();

  if (!screening) {
    return <></>;
  }
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
          alert(`delete applicant ${screening.id}`);
          setIsModalOpen(false);
          // deleteApplicant();
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      />
      <Button
        variant='contained'
        color='error'
        sx={{
          height: "4rem",
          fontSize: "1rem",
          borderRadius: ".8rem",
        }}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Archive Applicant
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
