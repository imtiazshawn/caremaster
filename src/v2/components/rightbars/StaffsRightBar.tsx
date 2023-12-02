import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { Button } from "@common/Button";
import { Column } from "@common/index";
import AddCareWorkerModal from "@components/modals/AddCareWorkerModal";
import { useGetCareWorkersQuery } from "@reducers/api/careWorkers";
import { useState } from "react";

export const StaffsRightBar = () => {
  const { refetch } = useGetCareWorkersQuery(null);

  const [openCareWorkerModal, setOpenCareWorkerModal] = useState(false);

  return (
    <Column
      sx={{
        gap: 3,
        marginTop: "2.5rem",
        width: ["20rem", "23rem", "23rem", "23rem", "35rem"],
      }}
    >
      <AddCareWorkerModal
        isOpen={openCareWorkerModal}
        onClose={() => {
          setOpenCareWorkerModal(false);
          refetch();
        }}
      />
      <Button
        variant='contained'
        sx={{
          height: "4.5rem",
          fontSize: "1.2rem",
          borderRadius: ".8rem",
        }}
        onClick={() => {
          setOpenCareWorkerModal(true);
        }}
      >
        + New Staff
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
