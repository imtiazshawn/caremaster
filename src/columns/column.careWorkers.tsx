import { headerClassName } from "@/shared/constants/table";
import { TableColumn } from "@common/Table";

import { CareWorkersTableUnit } from "$types/careWorkers";
import { formatDate } from "@/Utils";
import IconButton from "@common/IconButton";
import { Box, Row } from "@common/index";

export type ActionType = "edit" | "delete";

const getCareWorkerColumns = (
  handleAction: (dataId: string, actionType: ActionType) => void,
): TableColumn<CareWorkersTableUnit>[] => {
  return [
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
        return (
          <Box sx={{ textAlign: "center" }}>
            {formatDate(params.row.created_at ?? new Date())}
          </Box>
        );
      },
    },
    {
      width: 230,
      field: "action",
      headerName: "Action",
      headerClassName,
      sortable: false,
      renderCell: (params) => {
        const dataId = params.row.id.toString();
        return (
          <Row>
            <IconButton
              varient='edit'
              onClick={(e) => {
                e.stopPropagation();
                handleAction(dataId, "edit");
              }}
            />
            <IconButton
              varient='delete'
              onClick={(e) => {
                e.stopPropagation();
                handleAction(dataId, "delete");
              }}
            />
          </Row>
        );
      },
    },
  ];
};

export default getCareWorkerColumns;
