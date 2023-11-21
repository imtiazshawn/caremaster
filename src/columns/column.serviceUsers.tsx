import { TableColumn } from "@components/common/Table";

import { ENROLLMENT_STATUS, ServiceUser } from "$types/serviceUsers";
import { formatDate } from "@/Utils";
import { EnrollmentStatusColors } from "@/shared/constants/colors";
import { headerClassName } from "@/shared/constants/table";
import { Chip } from "@common/Chip";
import { Box, Row } from "@components/common";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const getServiceUserColumns = (
  handleAction: (dataId: string, actionType: string) => void,
): TableColumn<ServiceUser>[] => {
  return [
    {
      flex: 1,
      width: 200,
      field: "name",
      headerName: "Name",
      headerClassName,
    },
    {
      flex: 1,
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
      flex: 1,
      width: 230,
      field: "address",
      headerName: "Address",
      headerClassName,
      sortable: false,
    },
    {
      flex: 1,
      width: 230,
      field: "created_at",
      headerName: "Date of Register",
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
      flex: 1,
      width: 200,
      field: "date_of_birth",
      headerName: "Date of Birth",
      headerClassName,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ textAlign: "center" }}>
            {formatDate(params.row.created_at ?? new Date())}
          </Box>
        );
      },
    },
    {
      flex: 1,
      width: 230,
      field: "enrollment_status",
      headerName: "Status",
      headerClassName,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        return (
          <Chip
            label={
              params.row.enrollment_status || ENROLLMENT_STATUS.PRE_ADMISSION
            }
            sx={{
              background:
                EnrollmentStatusColors[
                  (params.row.enrollment_status ||
                    ENROLLMENT_STATUS.PRE_ADMISSION) as ENROLLMENT_STATUS
                ],
            }}
          />
        );
      },
    },
    {
      flex: 1,
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
              onClick={(e) => {
                e.stopPropagation();
                handleAction(dataId, "edit");
              }}
            >
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleAction(dataId, "delete");
              }}
            >
              <DeleteForeverIcon fontSize='small' />
            </IconButton>
          </Row>
        );
      },
    },
  ];
};
export default getServiceUserColumns;
