import { Button } from "@common/Button";
import { Table } from "@common/Table";
import { GlobalSearch } from "@components/GlobalSearch";
import { Typography } from "@mui/material";
import { useGetServiceUsersQuery } from "@reducers/api/serviceUsers";

import serviceUserColumns from "@/columns/column.serviceUsers";
import { COLORS } from "@/shared/constants/colors";

import { FlexBox, FullColumn } from "@common/index";
import AddServiceUserModal from "@components/modals/AddServiceUserModal";
import { useState } from "react";
import { mapServiceUsersTableData } from "./utils";

export type ServiceUsersTableUnit = {
  id: number | string;
  name: string;
  postcode: string;
  address: string;
  food_allergies: string;
  medicine_allergies: string;
  created_at: string;
  date_of_birth: string;
  banding: string;
  gender: string;
};

export const ServiceUsers = () => {
  const { data, isLoading } = useGetServiceUsersQuery(null);

  const serviceUsers: ServiceUsersTableUnit[] = mapServiceUsersTableData(
    data?.response.data ?? [],
  );

  const [isOpenServiceUserModal, setIsOpenServiceUserModal] = useState(false);

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
        columns={serviceUserColumns}
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
