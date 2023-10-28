import { TableColumn } from "@components/common/Table";
import dayjs from "dayjs";

import { ServiceUsersTableUnit } from "@/pages/ServiceUsers";

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
export default serviceUserColumns;
