import { TableColumn } from "@common/Table";
import dayjs from "dayjs";

import { ServiceUsersTableUnit } from "@/pages/ServiceUsers";
import { Box } from "@common/index";
const headerClassName = "bg-gray-100";
const serviceUserColumns: TableColumn<ServiceUsersTableUnit>[] = [
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
    field: "postcode",
    headerName: "Post Code",
    headerClassName,
    sortable: false,
    renderCell: (params) => {
      return (
        <Box sx={{ textTransform: "uppercase" }}>{params.row.postcode}</Box>
      );
    },
  },
  {
    flex: 0.25,
    width: 230,
    field: "address",
    headerName: "Address",
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
      return (
        <Box sx={{ textAlign: "center" }}>
          {dayjs(params.row.created_at).format("MM/DD/YYYY")}
        </Box>
      );
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

export default serviceUserColumns;
