import { CardWrapper } from "@/v2/components/CardWrapper";
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
        sx={{
          height: "4.5rem",
          fontSize: "1.2rem",
          borderRadius: ".8rem",
          backgroundColor: "#349572",
        }}
        onClick={() => {
          setOpenServiceUserModal(true);
        }}
      >
        + New Client
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
            borderTopRightRadius: "0px",
            p: 4,
          }}
        />
      </CardWrapper>
    </Column>
  );
};
