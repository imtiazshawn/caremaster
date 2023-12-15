import { MaintenanceRightBar } from "@/v2/components/rightbars/MaintenanceRightBar";
import { Button } from "@common/Button";
import { Column } from "@common/index";
import AddServiceUserModal from "@components/modals/AddServiceUserModal";
import { useGetServiceUsersQuery } from "@reducers/api/serviceUsers";
import { useState } from "react";
export const ClientRightBar = () => {
  const { refetch } = useGetServiceUsersQuery();

  const [openServiceUserModal, setOpenServiceUserModal] = useState(false);

  return (
    <Column
      sx={{
        gap: 3,
        width: ["30rem", "30rem", "30rem", "30rem", "40rem"],
      }}
    >
      <AddServiceUserModal
        isOpen={openServiceUserModal}
        onClose={() => {
          setOpenServiceUserModal(false);
          refetch();
        }}
      />
      <Button
        variant='contained'
        color='primary'
        sx={{
          height: "4.5rem",
          fontSize: "1.2rem",
          borderRadius: ".8rem",
          backgroundColor: "secondary",
        }}
        onClick={() => {
          setOpenServiceUserModal(true);
        }}
      >
        + New Client
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
