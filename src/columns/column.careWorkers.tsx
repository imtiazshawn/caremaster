import { TableColumn } from "@common/Table";
import dayjs from "dayjs";

import { ColumnWorkersTableUnit } from "@/pages/CareWorkers";

const headerClassName = "bg-gray-100";
const careWorkerColumns: TableColumn<ColumnWorkersTableUnit>[] = [
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
    field: "role",
    headerName: "Role",
    headerClassName,
    sortable: false,
  },
  {
    flex: 0.25,
    width: 230,
    field: "phone",
    headerName: "Mobile Number",
    headerClassName,
    sortable: false,
  },
  {
    flex: 0.25,
    width: 200,
    field: "email",
    headerName: "Email Address",
    headerClassName,
    sortable: false,
  },
  {
    flex: 0.25,
    width: 230,
    field: "status",
    headerName: "Status",
    headerClassName,
    sortable: false,
  },
  {
    flex: 0.25,
    width: 230,
    field: "created_at",
    headerName: "Created On",
    sortable: false,
    headerClassName,
    renderCell: (params) => {
      return <div>{dayjs(params.row.created_at).format("MM/DD/YYYY")}</div>;
    },
  },
];

export default careWorkerColumns;
