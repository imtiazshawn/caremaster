import { Button } from "@common/Button";
import { Table } from "@common/Table";
import { GlobalSearch } from "@components/GlobalSearch";
import { Typography } from "@mui/material";
import { useGetServiceUsersQuery } from "@reducers/api/serviceUsers";

import getServiceUserColumns from "@/columns/column.serviceUsers";
import { COLORS } from "@/shared/constants/colors";

import { ServiceUsersTableUnit } from "$types/serviceUsers";
import { FlexBox, FullColumn } from "@common/index";
import AddServiceUserModal from "@components/modals/AddServiceUserModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mapServiceUsersTableData } from "./utils";

export const ServiceUsers = () => {
  const { data, isLoading } = useGetServiceUsersQuery(null);
  const navigate = useNavigate();
  const serviceUsers: ServiceUsersTableUnit[] = mapServiceUsersTableData(
    data?.response?.data ?? [],
  );

  const [isOpenServiceUserModal, setIsOpenServiceUserModal] = useState(false);

  const handleActionCallback = (dataId: string, actionType: string) => {
    if (actionType === "edit") {
      navigate(`/service-users/${dataId}`);
    } else if (actionType === "delete") {
      //
    }
  };

  return (
    <FullColumn sx={{ background: COLORS.WHITE, p: 2, marginBottom: 2 }}>
      <AddServiceUserModal
        isOpen={isOpenServiceUserModal}
        onClose={() => setIsOpenServiceUserModal(false)}
      />
      <Typography
        variant='h5'
        sx={{ fontWeight: "bold" }}
      >
        Service Users
      </Typography>
      <FlexBox sx={{ height: "3em", gap: 2 }}>
        <GlobalSearch />
        <Button
          variant='contained'
          className='rounded-md'
          onClick={() => setIsOpenServiceUserModal(true)}
        >
          Add New Service User
        </Button>
      </FlexBox>
      <Table<ServiceUsersTableUnit>
        rows={serviceUsers}
        columns={getServiceUserColumns(handleActionCallback)}
        isLoading={isLoading}
      />
      <FlexBox sx={{ justifyContent: "space-between" }}>
        <FlexBox>
          <Button variant='outlined'>Care Plan</Button>
          <Button variant='outlined'>Move To</Button>
          <Button variant='outlined'>Audit Log</Button>
        </FlexBox>
        <FlexBox>
          <Button variant='contained'>Print</Button>
          <Button variant='contained'>Download Excel</Button>
        </FlexBox>
      </FlexBox>
    </FullColumn>
  );
};
