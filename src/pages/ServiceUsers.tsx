import { CustomFlexBox, FullColumn } from "@components/common";
import { Button } from "@components/common/Button";
import { Table, TableColumn } from "@components/common/Table";
import { GlobalSearch } from "@components/GlobalSearch";
import { Typography } from "@mui/material";
import { useGetServiceUsersQuery } from "@reducers/api/serviceUsers";
import dayjs from "dayjs";

import { COLORS } from "@/shared/constants/colors";

import { getServiceUsersTableData } from "./utils";

export type ServiceUsersTableUnit = {
  id: number | string;
  name: string;
  preferred_name: string;
  food_allergies: string;
  medicine_allergies: string;
  created_at: string;
  date_of_birth: string;
  banding: string;
  gender: string;
};

const headerClassName = "bg-gray-100";
const columns: TableColumn<ServiceUsersTableUnit>[] = [
  {
    flex: 0.25,
    width: 200,
    field: "name",
    headerName: "Name",
    headerClassName,
  },
  {
    flex: 0.25,
    width: 230,
    field: "food_allergies",
    headerName: "Food Allergies",
    headerClassName,
    sortable: false,
  },
  {
    flex: 0.25,
    width: 230,
    field: "medicine_allergies",
    headerName: "Medical Allergies",
    headerClassName,
    sortable: false,
  },
  {
    flex: 0.25,
    width: 230,
    field: "created_at",
    headerName: "Date of Register",
    sortable: false,
    headerClassName,
    renderCell: (params) => {
      return <div>{dayjs(params.row.created_at).format("MM/DD/YYYY")}</div>;
    },
  },
  {
    flex: 0.25,
    width: 200,
    field: "date_of_birth",
    headerName: "Date of Birth",
    headerClassName,
    sortable: false,
  },
  {
    flex: 0.25,
    width: 230,
    field: "banding",
    headerName: "Banding",
    headerClassName,
    sortable: false,
  },
];

export const ServiceUsers = () => {
  const { data, isLoading } = useGetServiceUsersQuery(null);

  const serviceUsers: ServiceUsersTableUnit[] = getServiceUsersTableData(
    data?.response.data ?? [],
  );

  return (
    <FullColumn
      sx={{ gap: 2, background: COLORS.WHITE, p: 2, marginBottom: 2 }}
    >
      <Typography
        variant='h5'
        sx={{ fontWeight: "bold" }}
      >
        Service Users
      </Typography>
      <CustomFlexBox sx={{ height: "3em", gap: 2 }}>
        <GlobalSearch />
        <Button
          variant='contained'
          className='rounded-md'
        >
          Add New Service User
        </Button>
      </CustomFlexBox>
      <Table<ServiceUsersTableUnit>
        rows={serviceUsers}
        columns={columns}
        isLoading={isLoading}
      />
      <CustomFlexBox sx={{ gap: 2, justifyContent: "space-between" }}>
        <CustomFlexBox sx={{ gap: 2 }}>
          <Button variant='outlined'>Care Plan</Button>
          <Button variant='outlined'>Move To</Button>
          <Button variant='outlined'>Audit Log</Button>
        </CustomFlexBox>
        <CustomFlexBox sx={{ gap: 2 }}>
          <Button variant='contained'>Print</Button>
          <Button variant='contained'>Download Excel</Button>
        </CustomFlexBox>
      </CustomFlexBox>
    </FullColumn>
  );
};
