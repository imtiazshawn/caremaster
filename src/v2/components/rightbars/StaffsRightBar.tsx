import { CardWrapper } from "@/v2/components/CardWrapper";
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
        width: ["30rem", "30rem", "30rem", "30rem", "40rem"],
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
          backgroundColor: "#349572",
        }}
        onClick={() => {
          setOpenCareWorkerModal(true);
        }}
      >
        + New Staff
      </Button>
      <CardWrapper
        color='secondary.main'
        textColor='secondary.contrastText'
        title='Maintenance'
      >
        <MaintenanceRightBar
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "50rem",
            borderTopLeftRadius: "0px",
            BorderTopRightRadius: "0px",
            p: 4,
          }}
        />
      </CardWrapper>
    </Column>
  );
};
