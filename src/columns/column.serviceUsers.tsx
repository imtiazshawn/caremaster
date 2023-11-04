import { TableColumn } from "@components/common/Table";

import { ServiceUsersTableUnit } from "$types/serviceUsers";
import { formatDate } from "@/Utils";
import { headerClassName } from "@/shared/constants/table";
import { Box, Row } from "@components/common";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";

const getServiceUserColumns = (
  handleAction: (dataId: string, actionType: string) => void,
): TableColumn<ServiceUsersTableUnit>[] => {
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
    },
    {
      flex: 1,
      width: 230,
      field: "banding",
      headerName: "Banding",
      headerClassName,
      sortable: false,
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
            <IconButton onClick={() => handleAction(dataId, "edit")}>
              <EditIcon fontSize='small' />
            </IconButton>
            <IconButton onClick={() => handleAction(dataId, "delete")}>
              <DeleteForeverIcon fontSize='small' />
            </IconButton>
          </Row>
        );
      },
    },
  ];
};
export default getServiceUserColumns;
